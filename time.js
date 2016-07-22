
var weeks = ["日","一","二","三","四","五","六"];
var now=new Date();  //实例化日期对象
var thisYear=now.getFullYear();
var thisMonth=now.getMonth()+1;
var today=now.getDate();
var thisWeek=weeks[now.getDay()];

//html页面加载
function init(){	
	setInterval('startTime()',1000); //右上角显示当前系统时间
	var y=document.getElementById('y');   //年份DOM
	var m=document.getElementById('m');   //月份DOM
	/*var h=document.getElementById('h');   //年份假期DOM*/	
	var str='';							  //拼接字符
		//为年份的下拉选项添加选项
	//var fragment = document.creatDocumentFragment();
	for(var i=1900;i<=2100;i++){		  //为年份的下拉列表指定可选项
		if(i==thisYear){					//默认选中当前年份
			str+='<option value="'+i+'" selected="selected">'+i+'年'+'</option>';
		}else{
		str+='<option value="'+i+'">'+i+'年'+'</option>';
		}
	}
	y.innerHTML=str;
	
	var str='';							  //恢复空白字符
	for(var i=1;i<=12;i++){		          //为月份的下拉列表指定可选项
		if(i==thisMonth){						//默认选中当前月份
			str+='<option value="'+i+'" selected="selected">'+i+'月'+'</option>';
		}else{
		str+='<option value="'+i+'">'+i+'月'+'</option>';
		}
	}
	m.innerHTML=str;
	//右上角显示时间
	fillDay(today);
	//document.getElementById('timeRightTop1').innerHTML=thisYear+"年"+thisMonth+"月"+today+"日"+" "+"星期"+thisWeek;
	showDetail(y.value,m.value);	//显示表格
}

function showDetail(year,month){                //展示细节的输入框
		var days=30;					  //默认为30天
		if(isRunNian(year)&&month==2){	  //如果是闰年的二月,天数为29
			days=29;
		}else if(!isRunNian(year)&&month==2){  //如果不是闰年的二月,天数为28
			days=28;
		}else if(month==1||month==3||month==5||month==7||month==8||month==10||month==12){   //其余月份天数为31
			days=31;
		}
		//拼接表格的表头，为星期
		var str='<tr  class="trWeek">';
		for(var i=0;i<weeks.length;i++){
			if(i==0||i==6){
				str+='<td class="weekend">星期'+weeks[i]+'</td>';//为周末添加样式
			}else{
				str+='<td>星期'+weeks[i]+'</td>';
			}
		}
		str+='</tr>';
		var date=new Date(year,month-1,1);   //创建指定年月日的日期       注意：月份位置是month-1;
		console.log(date);
		var week=date.getDay();				 //它对应的是星期几
		var j = 1;
		while(true){						 //永真循环
			str+='<tr border="1" class="tr1">';
			for(var i=0;i<=6;i++){ 			//循环7次
				if((j==1 && i<week)||(j>days)){	
					str+='<td>&nbsp;</td>';
				}else{	//星期对上以后，打印1号以后的日子
					str+='<td onclick="fillDay('+j+');">'+j+'<div class="ld" id="ld'+j+'"></div></td>';
					j++;
				}
			}
			str+='</tr>';
			if(j>days){					  //如果j超过了当月的天数，则退出
					break;
			}	
		}
		document.getElementById('tb1').innerHTML=str;	//填充输入区域
		//为今天以及假期添加样式
		var tds = document.getElementsByTagName("td");
		if(year==thisYear && month==thisMonth){
			for(var i=0; i<tds.length; i++){
				if(tds[i].firstChild.nodeValue==today){
					tds[i].setAttribute("class","today");
				}
			}
		}
		if(year==thisYear){					//为今年的假日添加样式
			for(var i=0; i<tds.length; i++){
				var tdValue = tds[i].firstChild.nodeValue;
				if((month==1)&&(tdValue==1||tdValue==2||tdValue==3)){
					tds[i].setAttribute("class","jia");
				}
				if((month==2)&&(tdValue==7||tdValue==8||tdValue==9||tdValue==10||tdValue==11||tdValue==12||tdValue==13)){
					tds[i].setAttribute("class","jia");
				}
				if((month==4)&&(tdValue==2||tdValue==3||tdValue==4||tdValue==30)){
					tds[i].setAttribute("class","jia");
				}
				if((month==5)&&(tdValue==1||tdValue==2)){
					tds[i].setAttribute("class","jia");
				}
				if((month==6)&&(tdValue==9||tdValue==10||tdValue==11)){
					tds[i].setAttribute("class","jia");
				}
				if((month==9)&&(tdValue==15||tdValue==16||tdValue==17)){
					tds[i].setAttribute("class","jia");
				}
				if((month==10)&&(tdValue==1||tdValue==2||tdValue==3||tdValue==4||tdValue==5||tdValue==6||tdValue==7)){
					tds[i].setAttribute("class","jia");
				}
			}
		}
		drawCld(year,month-1);	//显示公历   
	}

function isRunNian(y){					  //判断是否为闰年
	return y%4==0;						  //是否可以整除4
}
function startTime(){
	var now = new Date();
	var h=now.getHours();  //获取小时的方法
	var m=now.getMinutes(); //获取分钟的方法
	var s=now.getSeconds(); //获取秒的方法
	h=(h<10?"0"+h:""+h);
	m=(m<10?"0"+m:""+m); //判断分钟的值
	s=(s<10?"0"+s:""+s); //判断秒的值
	document.getElementById('mytime').innerHTML="北京时间："+h+":"+m+":"+s; 
}


function fillDay(d){
	var y=document.getElementById('y').value;//得到的年
	var m=document.getElementById('m').value;//得到的月
	var date=new Date(y,m-1,d);   //创建指定年月日的日期       注意：月份位置是month-1;
	var week=weeks[date.getDay()];				 //它对应的是星期几
	//为当前的输入框指定值
	document.getElementById('timeRightTop1').innerHTML=y+"年"+m+"月"+d+"日"+" "+"星期"+week;
}

//2016年假期选择下拉框选择时的反应
function holliday(){
	var hd=parseInt(document.getElementById('hd').value);
	//window.alert(hd);
	//document.getElementById('m').value=hd;
	var y = document.getElementById('y');
	y.selectedIndex=2016-1900;
	var m = document.getElementById('m');
	m.selectedIndex=hd-1;
	showDetail(y.value,m.value);
}
function holliday1(){//当改变年份、月份下拉框时，恢复假期下拉框的默认选项
	document.getElementById('hd').selectedIndex=0;
}


	
//按钮选择上一年、下一年、上个月、下个月
function pushBtm(K) {
	var y = document.getElementById('y');
	var m = document.getElementById('m');
	switch (K){
		case 'lastYear' :
			if(y.selectedIndex > 0)
				y.selectedIndex--;
			break;
		case 'nextYear' :
			if(y.selectedIndex < 149) 
				y.selectedIndex++;
	       		break;
		case 'lastMonth' :
			if(m.selectedIndex > 0) {      
				m.selectedIndex--;
			}
			else {
				m.selectedIndex = 11;
				if(y.selectedIndex > 0) 
					y.selectedIndex--;
			}
			break;
		case 'nextMonth' :
			if(m.selectedIndex < 11) {
				m.selectedIndex++;
			}
			else {
				m.selectedIndex = 0;
				if(y.selectedIndex < 149) 
					y.selectedIndex++;
			}
			break;
		default :
			y.selectedIndex = thisYear - 1900;
			m.selectedIndex = thisMonth-1;
			document.getElementById("hd").selectedIndex = 0;
	}
	showDetail(y.value,m.value);
}



/*以上的代码可以实现一个不带公历的万年历，
	切换年月日，选择日期；查看节假日；返回今天，显示当前系统的时间
	等基本的功能全部具有。
	接下来将万年历的公历信息添加进去*/

//农历数据信息
var lunarInfo = new Array(
0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,
0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,
0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,
0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,
0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,
0x06ca0,0x0b550,0x15355,0x04da0,0x0a5d0,0x14573,0x052d0,0x0a9a8,0x0e950,0x06aa0,
0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,
0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b5a0,0x195a6,
0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,
0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,
0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0)

//太阳历每月天数
var solarMonth = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
//天干
var Gan = new Array("甲","乙","丙","丁","戊","己","庚","辛","壬","癸");
//地支
var Zhi = new Array("子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥");
//属相
var Animals=new Array("鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪");
//节气
var solarTerm = new Array("小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至");
//Download by 
var sTermInfo = new Array(0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758);
//
var nStr1 = new Array('日','一','二','三','四','五','六','七','八','九','十');
//
var nStr2 = new Array('初','十','廿','卅','　');
//英语月份简写
var monthName = new Array("JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC");

//国历节日 *表示节假日
var sFtv = new Array(
		"0101*元旦",
		"0214 情人节",
		"0308 妇女节",
		"0312 植树节",
		"0315 消费者日",
		"0321 森林日",
		"0322 世界水日",
		"0323 气象日",
		"0324 防结核日",
		
		"0401 愚人节",
		"0407 卫生日",
		"0422 地球日",
		
		"0501*劳动节",
		"0504 青年节",
		"0505 防缺典日",
		"0508 红十字日",
		"0512 护士节",
		"0515 家庭日",
		"0517 电信日",
		"0518 博物馆日",
		"0520 营养日",
		"0523 牛奶日",
		"0531 无烟日",
		
		"0601 儿童节",
		"0605 环境日",
		"0606 爱眼日",
		"0616 防干旱日",
		"0623 奥林匹克",
		"0625 土地日",
		"0626 反毒品日",
		
		"0701 建党节",
		"0707 抗日纪念",
		"0711 人口日",
	
		"0801 建军节",
		"0808 父亲节",
		
		"0908 扫盲日",
		"0909 毛泽东逝",
		"0910 教师节",
		"0916 臭氧保护",
		"0920 爱牙日",
		"0927 旅游日",
		"0928 孔子诞辰",
		
		"1001*国庆节",
		"1004 动物日",
		"1006 老人节",
		"1008 视觉日",
		"1009 邮政日",
		"1015 盲人节",
		"1016 粮食日",
		"1017 消除贫困",
		"1024 联合国日",
		
		"1108 记者日",
		"1109 消防宣传",
		"1112 孙中山诞",
		"1114 糖尿病日",
		"1117 大学生节",

		"1201 艾滋病日",
		"1203 残疾人日",
		"1209 足球日",
		"1220 澳门回归",
		"1225 圣诞节",
		"1226 毛泽东诞",
		"1229 生物多样日"
		);

//农历节日 *表示节假日
var lFtv = new Array(
		"0101*春节",
		"0115 元宵节",
		"0505 端午节",
		"0707 情人节",
		"0715 中元节",
		"0815 中秋节",
		"0909 重阳节",
		"1208 腊八节",
		"1223 小年",
		"0100*除夕"
		);

//按周计算 月周日
var wFtv = new Array(
		"0520 母亲节",
		"0530 助残日",
		"0630 父亲节",
		"0932 和平日",
		"0940 聋人节",
		"1013 防灾害日",
		"1011 住房日"
		);
function drawCld(y,m) {
	var s,size;
	var cld = new calendar(y,m);
	document.getElementById("datedetail").innerHTML = '&nbsp;&nbsp;农历：' 
		+ cyclical(y-1900+36) + '年&nbsp;&nbsp; <div value="'+(y-4)%12+'"> [ '+Animals[(y-4)%12]+'年 ]</div>';
	 var animals=document.getElementById("animals");
	 var k=(y-4)%12;
	if(k==0){
		animals.style.backgroundImage='url(images/shu.JPG)';
	 }else if(k==1){
		animals.style.backgroundImage='url(images/niu.JPG)';
	 }else if(k==2){
		animals.style.backgroundImage='url(images/hu.JPG)';
	 }else if(k==3){
		animals.style.backgroundImage='url(images/tu.JPG)';
	 }else if(k==4){
		animals.style.backgroundImage='url(images/long.JPG)';
	 }else if(k==5){
		animals.style.backgroundImage='url(images/she.JPG)';
	 }else if(k==6){
		animals.style.backgroundImage='url(images/ma.JPG)';
	 }else if(k==7){
		animals.style.backgroundImage='url(images/yang.JPG)';
	 }else if(k==8){
		animals.style.backgroundImage='url(images/hou.jpg)';
	 }else if(k==9){
		animals.style.backgroundImage='url(images/ji.JPG)';
	 }else if(k==10){
		animals.style.backgroundImage='url(images/gou.JPG)';
	 }else if(k==11){
		animals.style.backgroundImage='url(images/zhu.JPG)';
	 }
		var year=parseInt(document.getElementById('y').value);//选择的年
		var month=parseInt(document.getElementById('m').value);//选择的月
		var days=30;					  //默认为30天
		if(isRunNian(year)&&month==2){	  //如果是闰年的二月,天数为29
			days=29;
		}else if(!isRunNian(year)&&month==2){  //如果不是闰年的二月,天数为28
			days=28;
		}else if(month==1||month==3||month==5||month==7||month==8||month==10||month==12){   //其余月份天数为31
			days=31;
		}
	for(var i=1;i<days;i++) {
		lObj = document.getElementById('ld'+ i);

	  	if(cld[i-1].lDay==1){
				lObj.innerHTML = '<b>'+(cld[i-1].isLeap?'闰':'') 
					+ cld[i-1].lMonth + '月' 
					+ (monthDays(cld[i-1].lYear,cld[i-1].lMonth)==29?'小':'大')+'</b>';
	  		}
			else{
		    	lObj.innerHTML = cDay(cld[i-1].lDay);
	       }
	    s=cld[i-1].lunarFestival;
		if(s.length>0) {
			//农历节日名称大于5个字截去
			if(s.length>7) s = s.substr(0, 5)+'…';
			s = s.fontcolor('#ff5f07');
		}else {
			s=cld[i-1].solarFestival;
			if(s.length>0) {
					//阳历节日名称截去
					//size = (s.charCodeAt(0)>0 && s.charCodeAt(0)<128)?8:4;			
					size = (s.charCodeAt(0)>0 && s.charCodeAt(0)<128)?9:5;
			 		if(s.length>size+1) s = s.substr(0, size-1)+'…';
					s = s.fontcolor('#0168ea');
			}else {
					s=cld[i-1].solarTerms;
					if(s.length>0) s = s.fontcolor('#44d7cf');
				}
			}
			if(s.length>0) lObj.innerHTML = s;
     	}
}
function calendar(y,m) {
	var sDObj, lDObj, lY, lM, lD=1, lL, lX=0, tmp1, tmp2;
	var lDPOS = new Array(3);
	var n = 0;
	var firstLM = 0;
    sDObj = new Date(y,m,1);    
	this.length    = solarDays(y,m);
    this.firstWeek = sDObj.getDay();
	for(var i=0;i<this.length;i++) {
		if(lD>lX) {
			sDObj = new Date(y,m,i+1);
			lDObj = new Lunar(sDObj);
			lY    = lDObj.year;
			lM    = lDObj.month;
			lD    = lDObj.day;
			lL    = lDObj.isLeap;
			lX    = lL? leapDays(lY): monthDays(lY,lM);
			if(n==0) firstLM = lM;
			lDPOS[n++] = i-lD+1;
	  	}
		this[i] = new calElement(y, m+1, i+1, nStr1[(i+this.firstWeek)%7],
                               lY, lM, lD++, lL,
                               cyclical(lDObj.yearCyl) ,cyclical(lDObj.monCyl), cyclical(lDObj.dayCyl++) );

	  
		if((i+this.firstWeek)%7==0)   this[i].color = '#ff5f07';
		if((i+this.firstWeek)%14==13) this[i].color = '#ff5f07';
    }
	tmp1=sTerm(y,m*2  )-1;
	tmp2=sTerm(y,m*2+1)-1;
	//log(1,  "m: "+m+" tmp1: "+tmp1+" "+solarTerm[m*2]+" tmp2: "+tmp2+" "+solarTerm[m*2+1]);
	this[tmp1].solarTerms = solarTerm[m*2];
    this[tmp2].solarTerms = solarTerm[m*2+1];
	if(m==3) this[tmp1].color = '#ff5f07';
        
        //使用正则表达式去除节日数组里面的日期，只保留节日名称
	for(i in sFtv)
		if(sFtv[i].match(/^(\d{2})(\d{2})([\s\*])(.+)$/))
			if(Number(RegExp.$1)==(m+1)) {
				this[Number(RegExp.$2)-1].solarFestival += RegExp.$4 + ' ';
				if(RegExp.$3=='*') this[Number(RegExp.$2)-1].color = '#ff5f07';
	       	}
	for(i in wFtv)
		if(wFtv[i].match(/^(\d{2})(\d)(\d)([\s\*])(.+)$/))
			if(Number(RegExp.$1)==(m+1)) {
				tmp1=Number(RegExp.$2);
				tmp2=Number(RegExp.$3);
				this[((this.firstWeek>tmp2)?7:0) + 7*(tmp1-1) + tmp2 - this.firstWeek].solarFestival += RegExp.$5 + ' ';
	       	}
	for(i in lFtv)  
		if(lFtv[i].match(/^(\d{2})(.{2})([\s\*])(.+)$/)) {
			tmp1=Number(RegExp.$1)-firstLM;
			if(tmp1==-11) tmp1=1;
			if(tmp1 >=0 && tmp1<n) {
				tmp2 = lDPOS[tmp1] + Number(RegExp.$2) -1;
				if( tmp2 >= 0 && tmp2<this.length) {
					this[tmp2].lunarFestival += RegExp.$4 + ' ';
					if(RegExp.$3=='*') this[tmp2].color = '#ff5f07';
				}
			}
	  }
		
	if((this.firstWeek+12)%7==5)
		this[12].solarFestival += '黑色周五 ';
     
	if(y==thisYear && m==(thisMonth-1)) {
		this[today-1].isToday = true;
	}
}

//判断不同年月份的天数
function solarDays(y,m) {
   if(m==1)
      return(((y%4 == 0) && (y%100 != 0) || (y%400 == 0))? 29: 28);
   else
      return(solarMonth[m]);
}
function Lunar(objDate) {
   var i, leap=0, temp=0;
   var baseDate = new Date(1900,0,31);
   var offset= Math.floor((objDate.getTime() + 2206425600000)/86400000);
   this.dayCyl = offset + 40;
   this.monCyl = 14;

   for(i=1900; i<2101 && offset>0; i++) {
      temp = lYearDays(i);
      offset -= temp;
      this.monCyl += 12;
   }
   
   if(offset<0) {
      offset += temp;
      i--;
      this.monCyl -= 12;
   }

   this.year = i;
   this.yearCyl = i-1864;

   leap = leapMonth(i);
   this.isLeap = false;

   for(i=1; i<13 && offset>0; i++) {
      if(leap>0 && i==(leap+1) && this.isLeap==false)
         { --i; this.isLeap = true; temp = leapDays(this.year); }
      else
         { temp = monthDays(this.year, i); }

      if(this.isLeap==true && i==(leap+1)) this.isLeap = false;

      offset -= temp;
      if(this.isLeap == false) this.monCyl ++;
   }

   if(offset==0 && leap>0 && i==leap+1)
      if(this.isLeap)
         { this.isLeap = false; }
      else
         { this.isLeap = true; --i; --this.monCyl;}

   if(offset<0){ offset += temp; --i; --this.monCyl; }

   this.month = i;
   this.day = offset + 1;
}

function cyclical(num) {
   return(Gan[num%10]+Zhi[num%12]);
}

function lYearDays(y) {
   var i, sum = 348;
   for(i=0x8000; i>0x8; i>>=1) sum += (lunarInfo[y-1900] & i)? 1: 0;
   return(sum+leapDays(y));
}

function leapDays(y) {
   if(leapMonth(y))  return((lunarInfo[y-1900] & 0x10000)? 30: 29);
   else return(0);
}

function leapMonth(y) {
   return(lunarInfo[y-1900] & 0xf);
}

function monthDays(y,m) {
   return( (lunarInfo[y-1900] & (0x10000>>m))? 30: 29 );
}




function calElement(sYear,sMonth,sDay,week,lYear,lMonth,lDay,isLeap,cYear,cMonth,cDay) {

      this.isToday    = false;
      this.sYear      = sYear;
      this.sMonth     = sMonth;
      this.sDay       = sDay;
      this.week       = week;
      this.lYear      = lYear;
      this.lMonth     = lMonth;
      this.lDay       = lDay;
      this.isLeap     = isLeap;
      this.cYear      = cYear;
      this.cMonth     = cMonth;
      this.cDay       = cDay;

      this.color      = '';

      this.lunarFestival = '';
      this.solarFestival = '';
      this.solarTerms    = '';

}

function sTerm(y,n) {
	var offDate = new Date( ( 31556925974.7*(y-1900) + sTermInfo[n]*60000  ) -2208549300000 );
    return(offDate.getUTCDate());
}


function cDay(d){
	var s;
	switch (d) {
		case 10:
			s = '初十'; 
			break;
		case 20:
			s = '二十'; 
			break;
		case 30:
			s = '三十';
			break;
		default :
			s = nStr2[Math.floor(d/10)];
			s += nStr1[d%10];
	}
	return(s);
}