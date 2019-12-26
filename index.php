$name = $_POST['customer'];
$phone = $_POST['phone'];
if (mail("ivysarra@gmail.com", "Заявка на обратный звонок", "ФИО:".$name.". Телефон: ".$phone,"From: info@satename.ru \r\n"))
 {
    echo "сообщение успешно отправлено";
} else {
    echo "при отправке сообщения возникли ошибки";
}
