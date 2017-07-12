<?php
namespace App\Http\Controllers;
use App\PushMessage;
class PUSHSDK{
	private $fromuserid;
	private $touserid;
	private $comment;
 	//消息推送方法
	function PushMessages($fromuserid='',$touserid='',$comment='')
	{
		//根据fromuserid获取from用户姓名暂时用userid 代替
		$pushmessages = new PushMessage;
		$pushmessages->comment = $comment;
		$pushmessages->created_at = time();
		$pushmessages->fromuserid = $fromuserid;
		$pushmessages->touserid = $touserid;
		$pushmessages->companyid = max(session('companyid'),1);
		$pushmessages->status = 0;
		$pushmessages->save();
	}

}