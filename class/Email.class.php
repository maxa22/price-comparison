<?php

class Email
{
    public $email;
    public $type;
    public $link;
    public $subject;
    public $body;

    /**
     * 
     * Constructor method for creating new email (whole email with subject and body).
     * Constructor calls prepare method to avoid double method calling.
     * @param string $email To which email we are sending email message.
     * @param string $type Which email template to get from template folder
     * @param string $link If email has a link inside it, then we need to provide link, otherwise provide empty string
     * @param object It return this object to allow method chaining.
     * 
     */
    public function __construct($email, $type, $link)
    {
        // Save data to the class fields
        $this->email = $email;
        $this->type = $type;
        $this->link = $link;

        // Prepare email subject and body for sending email
        $this->prepare();
    }

    /**
     * 
     * Method for preparing email subject and email body.
     * We use Language and Templater classes to get template, get the content from the language file and decode template to email body.
     * We don't have any parameters because this method is called through constructor to avoid double method calls.
     * @return object It return this instance of the object to allow method chaining
     * 
     */
    public function prepare()
    {

        // Prepare variables for adding data inside the switch
        $search = array();
        $replace = array();

        // Check type of email and get template accordingly
        switch ($this->type) {
            case "welcome_email":
            default:
                $this->subject = Language::get("email", "welcome-title");
                $search = array('title', 'introduction', 'message', 'button_link', 'button_text', 'footer_message', 'footer_regards');
                $replace = array(
                    Language::get("email", "welcome-title"),
                    Language::get("email", "welcome-introduction"),
                    Language::get("email", "welcome-message-1"),
                    $this->link,
                    Language::get("email", "welcome-button"),
                    Language::get("email", "welcome-footer-message"),
                    Language::get("email", "welcome-footer-regards")
                );
                $template = new Templater();
                $this->body = $template->get($this->type)->decode($search, $replace)->output();
                break;

            case "forgotten_password_email":
                $this->subject = Language::get("email", "forgotten-pass-title");
                $search = array('title', 'introduction', 'message', 'button_link', 'button_text', 'footer_message', 'footer_regards');
                $replace = array(
                    Language::get("email", "forgotten-pass-title"),
                    Language::get("email", "forgotten-pass-introduction"),
                    Language::get("email", "forgotten-pass-message-1"),
                    $this->link,
                    Language::get("email", "forgotten-pass-button"),
                    Language::get("email", "forgotten-pass-footer-message"),
                    Language::get("email", "forgotten-pass-footer-regards")
                );
                $template = new Templater();
                $this->body = $template->get($this->type)->decode($search, $replace)->output();
                break;

            case "change_password_email":
                $this->subject = Language::get("email", "change-pass-title");
                $search = array('title', 'introduction', 'message',  'footer_message', 'footer_regards');
                $replace = array(
                    Language::get("email", "change-pass-title"),
                    Language::get("email", "change-pass-introduction"),
                    Language::get("email", "change-pass-message-1"),
                    Language::get("email", "change-pass-footer-message"),
                    Language::get("email", "change-pass-footer-regards")
                );
                $template = new Templater();
                $this->body = $template->get($this->type)->decode($search, $replace)->output();
                break;

            case "send_2fa_email":
            case "resend_2fa_email":
                $this->subject = Language::get("email", "resend-2fa-title");
                $search = array('title', 'introduction', 'message', '2fa', 'footer_message', 'footer_regards');
                $replace = array(
                    Language::get("email", "resend-2fa-title"),
                    Language::get("email", "resend-2fa-introduction"),
                    Language::get("email", "resend-2fa-message-1"),
                    $this->link,
                    Language::get("email", "resend-2fa-footer-message"),
                    Language::get("email", "resend-2fa-footer-regards")
                );
                $template = new Templater();
                $this->body = $template->get("2fa_email")->decode($search, $replace)->output();

                break;
        }

        return $this;
    }

    /** 
     * 
     * Method for sending prepared email with subject and the body.
     * This method don't use any parameters because everything is loaded through constructor and method prepare() called inside it.
     * We use PHPMailer class and SMTP class to provide functionalities of sending emails.
     * PS: Namespaces are removed from these two classes so our autoloader can work with them.
     * @return bool It returns true on success, false otherwise.
     * 
     */
    public function send()
    {

        ### Riješiti ALT BODY 

        // Create new PHPMailer object
        $mail = new PHPMailer;

        // Confirm to object we use SMTP with PHPMailer object (external mail server)
        $mail->isSMTP();

        // Here we set a type of a mail (SMTP - External mail server)
        $mail->Mailer = "smtp";

        // Here we set SMTP host (External mail server domain)
        $mail->Host = 'mail.labmailer.com';

        // Here we set that we use authentication with SMTP host (true)
        $mail->SMTPAuth = true;

        // Here we set from which email we are sending emails
        $mail->Username = 'fr@labmailer.com';

        // Here we set password for email above
        $mail->Password = 'LabMailer.102.2021.FR!';

        // Here we set priority for email sending (1)
        $mail->Priority = 1;

        // Here we set type of SMTP Security (it depends of a email server host)
        $mail->SMTPSecure = 'ssl';

        // Here we set SMTP port for connecting to external server (it depends of a email server host)
        $mail->Port = 465;

        // Here we set which email will be shown in "from" part of email
        $mail->From = 'fr@labmailer.com';

        // Here we set what name will be shown in "from" part of email
        $mail->FromName = 'Forster Rohner';

        // Here we add $to parameter (to who we are sending email)
        $mail->addAddress($this->email);

        // Here we define "reply-to" email address and name (when user click to Reply, email will be sent to this email)
        $mail->addReplyTo('fr@labmailer.com', 'Reply');

        // Here we confirm is email HTML or not
        $mail->isHTML(true);

        // Here we set subject and body for email (using parameters function recieved)
        $mail->Subject = $this->subject;
        $mail->Body    = $this->body;

        ### OVO TREBA RIJEŠITI JER NE MOŽE OVAKO OTIĆI EMAIL
        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

        // Check is email is sent or not
        if (!$mail->send()) {
            return false;
        } else {
            // If email is sent, than return true
            return true;
        }
    }
}


/* Class Testing */
/* require '../configuration.php';
$email = new Email("hodzicadmir999@gmail.com", "welcome_email", "https://testiranje.com");
var_dump($email->send());  */
#$email = new Email("web@amarbeslija.com", "forgotten_password_email", "https://testiranje.com");
#var_dump($email->send());
#$email = new Email("web@amarbeslija.com", "change_password_email", "https://testiranje.com");
#var_dump($email->send());
#$email = new Email("web@amarbeslija.com", "send_2fa_email", "https://testiranje.com");
#var_dump($email->send());

/**
 * NOTES
 * @status FINISHED FOR NOW
 * @explanation TO ADD MORE TEMPLATES, USE SWITCH INSIDE PREPARE METHOD AND ADD TEMPLATE INSIDE "template" FOLDER!
 * ALSO, STATIC PARTS OF EMAIL BODY NEEDS TO BE DEFINED INSIDE LANGUAGE FILES OR WE WILL GET EMPTY BODY WITHOUT CONTENT!
 */
