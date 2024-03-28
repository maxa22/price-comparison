<?php

require '../configuration.php';
require "../function/edit_profile.function.php";
$data = [
    "email" => '<%...
    Statement stmt = conn.createStatement();
    ResultSet rs = stmt.executeQuery("select * from emp where id="+eid);
    if (rs != null) {
    rs.next();
    String name = rs.getString("name");
    %>
    Employee Name: <%= name %>'
];
echo edit_profile($data);
