/***********************************************************
	Here is a rough outline for sending multipart messages 
	with php. MIME Types correct. 
	
	-Vinny Laurenzano

/***********************************************************/


<?php

	 $textMessage = "Text part of the Email";
	
	 $htmlMessage ='<html>HTML version of the Email</html>';
					

	 $semi_rand = md5(time());
	 $mime_boundary = "__MULTIPART_BOUNDARY_$semi_rand";
	 $headers = "MIME-Version: 1.0\r\n";
	 $headers .= "From: Name <".$fromEmail.">\r\n";
	 $headers .= "Subject: Here is the Subject\r\n";
	 $boundary = $mime_boundary;
	 $headers .= "Content-Type: multipart/alternative;boundary=" . $boundary . "\r\n";
	
	 $message = "This is a MIME encoded message."; 
	 
	 $message .= "\r\n\r\n--" . $boundary . "\r\n";
	 $message .= "Content-type: text/plain;charset=utf-8\r\n\r\n";
	 $message .= $textMessage;;

	 $message .= "\r\n\r\n--" . $boundary . "\r\n";
	 $message .= "Content-type: text/html;charset=utf-8\r\n\r\n";
	 $message .= $htmlMessage;

	 $message .= "\r\n\r\n--" . $boundary . "--";	
	
	mail($toEmail,"Subject",$message,$headers);