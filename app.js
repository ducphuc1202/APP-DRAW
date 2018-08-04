var red = 255; var green = 0;  var blue = 0;
var color = "rgb(255,0,0)";
var new_color = "rgb(255,0,0)";
var x = 0,y = 0;
var isMouseDown = false;
var canvas = $('#canvas')[0];
var context = canvas.getContext('2d');
$(document).ready(function() {
    $('#colorSelect').hide();
    $('.getColor').hide();
    /* Su kien selected color */
    $('.controls').on('click', 'li', function() {
        $('.selected').removeClass('selected');
        $(this).addClass('selected');
        color = $(this).css('background-color');
    })
    /* Su kien Them Color moi */
    $('#revealColorSelect').click(function(){
        $('#colorSelect').toggle();
    })
    
    /* Su kien lay ma mau */
    $('.sliders').find('input').change(function(event){
        if($(this).attr('id') === 'red'){
            red = $(this).val();
        }
        if($(this).attr('id') === 'green'){
            green = $(this).val();
        }
        if($(this).attr('id') === 'blue'){
            blue = $(this).val();
        }
        /* Chuyen ma rgb thanh mau background */
        new_color="rgb(" + red + ',' + green + ',' + blue + ')';
        $('#newColor').css('background-color', new_color);
    })
    
    /* Them ma mau moi vao list */
    $('#addNewColor').click(function() {
        var $li = $('<li></li>');
        $li.css('background-color',new_color);
        $('.controls ul').append($li);
        $li.click();
    })
    
    /* Bat su kien draw */
    $(canvas).mousedown(function(event) {
        lastPos = event;
        isMouseDown = true;
        context.beginPath();
    })
        .mousemove(function(event) {
            if(isMouseDown) {
                context.moveTo(lastPos.offsetX, lastPos.offsetY);
                context.strokeStyle=color;
                context.lineTo(event.offsetX,event.offsetY);
                context.stroke();
                lastPos = event;
            }
        })
        .mouseup(function(event) {
            isMouseDown = false;
        })
        .mouseout(function(event) {
            isMouseDown = false;
        })
    
    
    /* Open overlay */
    $('#copyColor').click(function() {
        $('#rgb').val(color);
        console.log($('#rgb').val());
        var r1 = Math.floor(red/16);
        var r2 = red%16;
        var g1 = Math.floor(green/16);
        var g2 = green%16;
        var b1 = Math.floor(blue/16);
        var b2 = blue%16;
        var str = "#" + getCharacter(r1) + getCharacter(r2) + getCharacter(g1) + getCharacter(g2) + getCharacter(b1) + getCharacter(b2);
        $('#hexa').val(str);
        $('.getColor').show().slideDown(1500).fadeIn(1300);
        $('.getColor').css('height', document.querySelector('body').scrollHeight + 'px');
        $('.box').css('margin-top',(document.querySelector('body').scrollHeight - window.innerHeight));
    })
    function getCharacter(num) {
        if(num < 10) return num;
        else {
            if(num === 10) return "A";
            if(num === 11) return "B";
            if(num === 12) return "C";
            if(num === 13) return "D";
            if(num === 14) return "E";
            if(num === 15) return "F";
        }
    }
    /* Close overlay */
    $('#close').click(function() {
        $('.getColor').hide();
    })
    
})
