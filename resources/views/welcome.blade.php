<!DOCTYPE html>
<html>
    <head>
        <title>Laravel</title>

        <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">

        <style>
            html, body {
                height: 100%;
            }

            body {
                margin: 0;
                padding: 0;
                width: 100%;
                display: table;
                font-weight: 100;
                font-family: 'Lato';
            }

            .container {
                text-align: center;
                display: table-cell;
                vertical-align: middle;
            }

            .content {
                text-align: center;
                display: inline-block;
            }

            .title {
                font-size: 96px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="content">
                <div class="title">Laravel 5</div>
            
        <form method="post" action="/userlogin" enctype="multipart/form-data" name="forms">
            {{ csrf_field() }}
            {{-- companyname<input type="text" name="wk_type" value="1" id="task-name" class="form-control"> --}}
            {{-- usermobile<input type="text" name="id" id="taskname" value="4" class="form-control"> --}}
             <input type="text" name="usermobile" id="task-name" value="1" class="form-control">
             <input type="text" name="userpassword" id="task-name" value="4" class="form-control">
             <input type="text" name="remark" id="task-name"   class="form-control">
             <label><input name="status" type="radio" value="1" />同意 </label> 
            <label><input name="status" type="radio" value="2" />不 </label> 
            <label><input name="status" type="radio" value="3" />转交</label> 
            <input type="file" name="appliesfile">
            <input type="submit" value="接口测试">  
        </form>
        </div>
        </div>

    </body>
</html>
