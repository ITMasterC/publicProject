
<script type="text/javascript">
   var sum = 0; 
   var str=location.href; //取得整个地址栏
   var num=str.indexOf("?") 
   str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
 
   var arr=str.split("&"); //各个参数放到数组里
   for(var i=0;i < arr.length;i++){ 
    num=arr[i].indexOf("="); 
    if(num>0){ 
     value=arr[i].substr(num+1);
     sum=sum + parseInt(value);
     } 
    }
	document.write(sum);
</script>
