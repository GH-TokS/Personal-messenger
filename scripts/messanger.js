var val2; //Переменная в которой хранится информация о том, кто мы - User1 или User2

butt.onclick = async function() { //Нажатие кнопки отправки своего сообщения собеседнику
		var val = document.getElementById('textelement').value;
		const options ={method:"POST",'content-type':'application/json', headers: {"Accept": "*/*"}}
		var url = 'http://localhost:8080/user?user='+val2+'&message='+val;//Запрос к серверу для оправки своего сообщения собеседнику
        const request = await fetch(url, options);
        if(request.ok){
            const response = await request.json();
            var messageblock = document.getElementById('TGA');
            var div = document.createElement('div');
            div.setAttribute("class", "outgoing-chats");
            var date = new Date();
            var month = new Date().toLocaleString('ru-RU',{month:'long'});
            div.innerHTML='<div class="outgoing-chats-img"><img src="user1.png" /></div><div class="outgoing-msg"><div class="outgoing-chats-msg"><p>'+response.userMessage+' </p><span class="time">'+date.getHours()+':'+date.getMinutes()+' | '+month+' '+date.getFullYear()+'</span></div></div>'
            messageblock.appendChild(div);
        }
};
butt0.onclick = async function() { //Нажатие кнопки получения сообщений от собеседника
		const options ={ method:"GET",'content-type':'application/json', headers: {"Accept": "*/*"}}
		var secondUser = "User2"; //В зависимости от того, кто мы (User1 или User2), определяем собеседника (он будет или User1 или User2)
		if (val2 == "User2"){secondUser = "User1";}//Определяем чему-же будет равен собеседник - User1 или User2
        const request = await fetch('http://localhost:8080/message?user='+secondUser, options);//Запрос к серверу для получения последнего сообщения собеседника
        if(request.ok){
            const response = await request.json();
            var messageblock = document.getElementById('TGA');
            var div = document.createElement('div');
            div.setAttribute("class", "received-chats");
            var date = new Date();
            var month = new Date().toLocaleString('ru-RU',{month:'long'});
            div.innerHTML='<div class="received-chats-img"><img src="user2.png" /></div><div class="received-msg"><div class="received-msg-inbox"><p>'+response.userMessage+' </p><span class="time">'+date.getHours()+':'+date.getMinutes()+' | '+month+' '+date.getFullYear()+'</span></div></div>'
            messageblock.appendChild(div);
        }
};

window.onload = async function(){ //Функция при загрузке страницы назначит пользователя User1 или User2 - кто раньше встал, того и тапки
		const options ={method:"GET",'content-type':'application/json',headers: {"Accept": "*/*"}}
        const request = await fetch('http://localhost:8080/getUser', options); //Запрос к серверу для определения кем мы будем - User1 или User2
        if(request.ok){
            var userCaption = document.getElementById('userCaption');
            const response = await request.json();
            if(response.user=="User1"){
                userCaption.innerHTML="<p>User1</p>"
                val2 = "User1"
            }
            if(response.user=="User2"){
                userCaption.innerHTML="<p>User2</p>"
                val2 = "User2"
            }
        }

}
