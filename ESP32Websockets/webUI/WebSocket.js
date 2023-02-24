      var ipInput = document.querySelector('#ip-input');
      var ws = new WebSocket(`ws://${ipInput.value}/ws`);
      ///var ws = new WebSocket('ws://192.168.43.110/ws'); 
      const chatDiv = document.querySelector('#chat-box');
      const messageInput = document.querySelector('#message');
      
      ws.onopen = function() {
        console.log('Connected to WebSocket server');
      };
      
      ws.onclose = function() {
        console.log('Disconnected from WebSocket server');
      };
      
      ws.onmessage = function(event) {
        const p = document.createElement('p');
        p.textContent = event.data;
        chatDiv.appendChild(p);
        chatDiv.scrollTop = chatDiv.scrollHeight;
        sub_string(event.data);
        document.querySelector('#chat-box').appendChild(p);
      };
      function sub_string(str)
      {
        //console.log(str);
        //const str = "#:0:0:1:1:0:0";
        //#2:5:0:1:1:0
            if (str.startsWith("#"))
            {
              const numbers = str.split(':'); // แยกตัวเลขออกจาก string โดยใช้เครื่องหมาย :
              //console.log(numbers); // ["#2", "5", "0", "1", "1", "0"]
              const numericValues = numbers.slice(1).map(num => parseInt(num)); // นำตัวเลขที่แยกออกมาแปลงเป็นตัวเลขจริง
              // const numericValues = numbers.slice(1).map(num => parseInt(num, 10));
              num_stamp[numericValues[0]][numericValues[1]]= numericValues[6];
              //console.log(num_stamp[numericValues[0]][numericValues[1]]);
              switch (numericValues[2]) 
              {
                case 0:
                  walls[numericValues[0]][numericValues[1]].row = numericValues[4];
                  walls[numericValues[0]][numericValues[1]].col = numericValues[3];
                  walls[numericValues[0]+1][numericValues[1]].col = numericValues[5];
                  break;
                case 1:
                  walls[numericValues[0]+1][numericValues[1]].col = numericValues[4];
                  walls[numericValues[0]][numericValues[1]].row = numericValues[3];
                  walls[numericValues[0]][numericValues[1]+1].row = numericValues[5];
                  break;
                case 2:
                  walls[numericValues[0]][numericValues[1]+1].row = numericValues[4];
                  walls[numericValues[0]+1][numericValues[1]].col = numericValues[3];
                  walls[numericValues[0]][numericValues[1]].col = numericValues[5];
                  break;
                case 3:
                  walls[numericValues[0]][numericValues[1]].col = numericValues[4];
                  walls[numericValues[0]][numericValues[1]+1].row = numericValues[3];
                  walls[numericValues[0]][numericValues[1]].row = numericValues[5];
                  break;
              }
              for (let i = 0; i <= map_x; i++) 
                {
                  walls[i][map_y].row= walls[i][0].row ;
                  walls[i][0].row = walls[i][map_y].row;
                  
                } 
              for (let i = 0; i <= map_y; i++) 
                {
                  walls[map_x][i].col= walls[0][i].col
                  ;
                  walls[0][i].col=walls[map_x][i].col;
                }
              bot(numericValues);
            }
      }


      function send() {
       // bot_move(5,5,3);
        const message = messageInput.value;
        ws.send(message);
        //messageInput.value = '';
      }
      messageInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
          if(messageInput.value != '')
          {
            send();
          }
        }
      });
       ipInput.addEventListener('change', function() {
        // ฟังก์ชันที่จะเรียกเมื่อค่าใน input element เปลี่ยนแปลง
        // ตัวอย่างเช่น
        ipInput = document.querySelector('#ip-input');
        ws = new WebSocket(`ws://${ipInput.value}/ws`);
        console.log('New IP address: ' + ipInput.value);
        // ในที่นี้เมื่อเกิด change event จะแสดงค่า IP address ใน console log
      });