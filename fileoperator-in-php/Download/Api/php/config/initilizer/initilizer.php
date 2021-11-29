<?php

/*
*  0=unpaid
 * 1=completed
*  2=paid 
*  3= in progress
*  4= completed
*  5= rejected
*  6= inrevision
*
*/
defined('DS') ? null : define('DS', DIRECTORY_SEPARATOR);

defined('SITE_ROOT') ? null : define ('SITE_ROOT', $_SERVER['DOCUMENT_ROOT'].'admin');
defined('LIB_PATH') ? null : define ('LIB_PATH',SITE_ROOT.DS.'php');

//load database configaration first;
//require_once(LIB_PATH.DS."config/db/db.php");
//require_once(LIB_PATH.DS."config/crypto/crypto.php");

//require_once LIB_PATH.DS."config/db/db.php";


//require_once(LIB_PATH.DS."router/router.php");
?>