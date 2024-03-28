<?php

class Database
{
    
    private $connection;
    private $results;
    private $table_name;
    private $accepted_comparison_operators;
    private $accepted_logical_operators;
    private $where_arguments;
    private $logical_operators;
    private $where_grouping_status;
    private $columns_to_manipulate;
    private $join;
    private $group_by;
    private $order_by;
    private $limit;
    private $offset;
    private $last_id;

    /**
     * 
     * This constructor uses global $connection which is defined and included inside the configuration.php file.
     * If we don't have $connection inside the global scope, this class will not function and therefor nor will whole application.
     * 
     */
    public function __construct($table_name)
    {

        global $connection;
        $this->connection = $connection;
        $this->table_name = $table_name;
        $this->accepted_comparison_operators = [ '=', '>', '<', '>=', '<=', '<>', 'LIKE' ];
        $this->accepted_logical_operators = ['AND', 'OR', '&&', '||'];
        $this->where_arguments = [];
        $this->logical_operators = [];
        $this->where_grouping_status = 'none';
        return $this;

    }


    public static function table($name) 
    {

        return new Database($name);

    }

    public function select() 
    {

        // $arguments = func_get_args();
        $this->columns_to_manipulate = func_get_args(); //$this->clear_inputs($arguments);
        $query = $this->construct_select_query();
        // return $query;
        if ($this->query($query) === true) return $this->output();
        return false;

    }

    public function update(array $fields_and_values) 
    {
        
        for ($i = 0; $i < count(array_keys($fields_and_values)); $i++) 
        {

            $key = $this->clear_input( array_keys($fields_and_values)[$i] );
            $this->columns_to_manipulate[$key] = $this->clear_input($fields_and_values[$key]); 

        }
        $query = $this->construct_update_query();
        if ($this->query($query) === true) return true;
        return false;

    }

    public function insert(array $fields_and_values) 
    {

        for ($i = 0; $i < count(array_keys($fields_and_values)); $i++) 
        {

            $key = $this->clear_input( array_keys($fields_and_values)[$i] );
            $this->columns_to_manipulate[$key] = '"' . $this->clear_input($fields_and_values[$key]) . '"'; 

        }
        $query = $this->construct_insert_query();
        if ($this->query($query, true) === true) return $this->last_id;
        return false;

    }

    public function delete() 
    {

        $query = $this->construct_delete_query();
        if ($this->query($query) === true) return true;
        return false;

    }

    public function where($column_name, $operator, $column_value)
    {

        if (is_array($column_name)) return $this->where_clause_from_array($column_name, $operator, $column_value);
        $arguments = func_get_args();
        if ($this->where_grouping_status === "start") {
            $grouping_bracket_start = " ( ";
            $this->where_grouping_status = "in progress";
        } else {
            $grouping_bracket_start = "";
        }
        
        for ($i = 0; $i < count($arguments); $i+=3) 
        {

            if (!$this->is_comparison_operator($arguments[$i + 1])) throw new Error('Comparison operator not supported');
            $arguments[$i] = $grouping_bracket_start . $this->clear_input($arguments[$i]);
            $arguments[$i + 2] = $this->clear_input($arguments[$i + 2]);
            $argument = $arguments[$i] . ' ' . $arguments[$i + 1] . ' "' . $arguments[$i + 2] . '"';
            array_push($this->where_arguments, $argument);

        }
        
        return $this;

    }

    public function where_clause_from_array(array $column_names, array $operators, array $column_values) 
    {

        $this->group_start();
        for ($i = 0; $i < count($column_names); $i++) $this->where($column_names[$i], $operators[$i], $column_values[$i]);
        $this->group_end();
        return $this;

    }

    public function group_start()
    {

        if ($this->where_grouping_status === "none") $this->where_grouping_status = "start";
        return $this;

    }
    
    public function group_end()
    {

        $this->where_grouping_status = "none";
        $this->where_arguments[count($this->where_arguments) - 1] .= " )";
        return $this;

    }

    public function like($column, $value) 
    {

        if (is_array($column)) return $this->like_clause_from_array();
        $this->where($column, 'LIKE', $value);
        return $this;

    }

    public function like_clause_from_array(array $column_names, array $column_values) 
    {

        $this->group_start();
        for ($i = 0; $i < count($column_names); $i++) $this->like($column_names[$i], $column_values[$i]);
        $this->group_end();
        return $this;

    }

    public function and() 
    {

        return $this->handle_logical_operators('AND');

    }

    public function or() 
    {

        return $this->handle_logical_operators('OR');

    }

    protected function handle_logical_operators($operator) 
    {

        $this->update_logical_operators($operator);
        return $this;

    }

    public function join(string $type, string $table_name, string $column_name, string $join_column_name) 
    {

        $this->join .= " " . $type . " JOIN " . $table_name . " ON " . $column_name . " = " . $join_column_name ; 
        return $this;

    }

    public function inner_join(string $table_name, string $column_name, string $join_column_name) 
    {

        $this->join .= " INNER JOIN " . $table_name . " ON " . $column_name . " = " . $join_column_name ; 
        return $this;

    }

    public function group_by(string $column_name) {
        $this->group_by = " GROUP BY " . $column_name ; 
        return $this;

    }

    public function limit(int $limit) 
    {

        if (!is_int($limit)) return $this;
        $this->limit = " LIMIT " . $limit;
        return $this;

    }

    public function offset(int $offset) 
    {
        if (!is_int($offset)) return $this;
        $this->offset = " OFFSET " . $offset;
        return $this;
    }

    public function order_by(string $what, string $how = 'ASC') 
    {

        if (!in_array(strtolower($how), ["asc", "desc"])) return $this;
        $what = $this->clear_input($what);
        $this->order_by = " ORDER BY " . $what . " " . $how;
        return $this;

    }


    public function construct_select_query() 
    {

        $columns = $this->construct_columns_to_manipulate();
        $where = $this->construct_where();
        $limit = !property_exists($this, 'limit') ? "" :  $this->limit;
        $order_by = !property_exists($this, 'order_by') ? "" : $this->order_by;
        $join = !property_exists($this, 'join') ? "" : $this->join;
        $group_by = !property_exists($this, 'group_by') ? "" : $this->group_by;
        $offset = !property_exists($this, 'offset') ? "" : $this->offset;
        return "SELECT {$columns} FROM {$this->table_name} {$join} {$where} {$group_by} {$order_by} {$limit} {$offset}";

    }

    public function construct_update_query() 
    {

        $where = $this->construct_where();
        $what_to_update = $this->construct_columns_to_manipulate_for_update();
        return "UPDATE {$this->table_name} SET {$what_to_update} {$where}";

    }

    public function construct_insert_query() 
    {

        $what_to_insert = $this->construct_insert_columns_and_values();
        return "INSERT INTO {$this->table_name} {$what_to_insert}";

    }

    public function construct_delete_query() 
    {
        
        $where = $this->construct_where();
        return "DELETE FROM {$this->table_name} {$where}";

    }
    
    public function construct_columns_to_manipulate() 
    {

        $what_to_select = "";
        if (count($this->columns_to_manipulate) === 0) $what_to_select = "*";
        for($i = 0; $i < count($this->columns_to_manipulate); $i++) $what_to_select .=  $this->columns_to_manipulate[$i] . ", ";
        $what_to_select = rtrim($what_to_select, ", ");
        return $what_to_select;

    }

    public function construct_columns_to_manipulate_for_update() 
    {

        $what_to_update = ""; 
        for($i = 0; $i < count($this->columns_to_manipulate); $i++) 
        {

            $key = array_keys($this->columns_to_manipulate)[$i];
            $what_to_update .= ' ' . $key . ' = "' . $this->columns_to_manipulate[$key] . '",';

        }
        return rtrim($what_to_update, ',');

    }

    protected function construct_where() 
    {

        if (!property_exists($this, 'where_arguments')) return "";
        if ($this->where_arguments === []) return "";
        if (count($this->where_arguments) === 1) return " WHERE " . $this->where_arguments[0] . " ";

        $this->update_logical_operators();
        $where = " WHERE";
        for ($i = 0; $i < count($this->where_arguments); $i++) 
        {
            
            $where_condition = strpos($this->where_arguments[$i], " LIKE ") !== false ? $this->construct_where_like($this->where_arguments[$i]) :  $this->where_arguments[$i] ;
            $where .= " ";
            $where .= $where_condition;
            $where .= " ";
            $where .= $this->logical_operators[$i];

        }

        $where = rtrim($where, ' OR');
        $where = rtrim($where, ' AND');

        return $where;

    }

    protected function construct_where_like($column_name_and_value) 
    {

        $column_name = explode("LIKE", $column_name_and_value)[0];
        $column_value = explode("LIKE", $column_name_and_value)[1];
        $has_right_bracket = strpos($column_value, ")") !== false ? ")" : "";
        $column_value = ltrim($column_value, '" ');
        $column_value = rtrim($column_value, ' ")');
        return $column_name . 'LIKE "%' . $column_value . '%"' . $has_right_bracket;

    }

    protected function construct_insert_columns_and_values() 
    {

        $column_names = array_keys($this->columns_to_manipulate);
        $column_values = array_values($this->columns_to_manipulate);
        return "( " . implode(",", $column_names) . ") VALUES (" . implode(",", $column_values) . " )"; 
    
    }

    protected function clear_input($input) 
    {

        $input = Security::clean($input);
        $input = Security::escape($input);
        return $input;

    }

    protected function clear_inputs(array $input) 
    {

        $cleared_array = [];
        for($i = 0; $i < count($input); $i++) 
        {

            $cleared_array[$i] = $this->clear_input($input[$i]);
        
        }

        return $cleared_array;

    }

    protected function is_comparison_operator (string $operator) 
    {

        if (in_array($operator, $this->accepted_comparison_operators)) return true;
        return false;

    }

    protected function is_logical_operator (string $operator) 
    {

        if (in_array($operator, $this->accepted_logical_operators)) return true;
        return false;

    }

    protected function update_logical_operators($current_operator = 'AND') 
    {

        if (count($this->logical_operators) === count($this->where_arguments)) return;
        for ($i = count($this->logical_operators); $i < count($this->where_arguments) - 1; $i++) 
        {

            $this->logical_operators[$i] = 'AND';

        }

        $this->logical_operators[count($this->where_arguments) - 1] = $current_operator;

    }

    public function set_table_name ($table_name ) {
        $this->table_name = $table_name;
    }

    protected function reset() 
    {
        $this->limit = '';
        $this->offset = '';
        $this->order_by = '';
        $this->join = '';
        $this->group_by = '';
        $this->columns_to_manipulate = [];
        $this->where_arguments = [];
        $this->logical_operators = [];
        $this->where_grouping_status = 'none';
    }


    /**
     * 
     * Method for executing any query from this class or from the outside if needed.
     * Be advised that this method doesn't fetch any data it just executes query!
     * Use output method to fetch data!
     * @param string $query Method expect already formed query to execute it!
     * @param bool $last_id If true it return last inserted id otherwise just returns true
     * @return bool|string It return true on success, otherwise it returns error.
     * 
     */
    public function query($query, $last_id = false)
    {
        $this->reset();
        if ($last_id == false) {
            if ($this->results = $this->connection->query($query)) {
                return true;
            } else {
                return $this->connection->error;
            }
        }else{
            if ($this->results = $this->connection->query($query)) {
                $this->last_id = $this->connection->insert_id;
                return true;
            } else {
                return $this->connection->error;
            }
        }
    }


    public function output()
    {
        if ($this->results->num_rows > 0) {

            $output_array = array();
            $i = 0;
            while ( $row = $this->results->fetch_assoc()) {
                $output_array[$i] = $row;
                $i++;
            }
            return $output_array;

        } else {
            return [];
        }
    }

    /**
     * 
     * Method for deleting all rows inside one table and setting auto_increment to 1 automatically
     * @param string $table Table in which we will delete all rows and set auto_increment to 1
     * @return bool|string On sucess it returns true, otherwiser it returns mysql error or false for now
     * 
     */
    public function empty($table)
    {

        if (!empty($table)) {
            $query = "TRUNCATE TABLE {$table}";
            $execute = $this->query($query);
            return $execute;
        }

        return false;
    }
}

/* Class Testing 
include "../configuration.php";
json_encode((Database::table('users'))
        ->where(['name', 'age'], ['<>', '='], ['mladen', 19])
        ->or()
        ->like('name', 'jo')
        ->inner_join('adress', 'adress.user_id', 'users.id')
        ->select('name', 'adress.num'));
*/
