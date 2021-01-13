
function cpf(inputtxt)
{
  var re = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
  if(inputtxt.value.match(re))
     {
        document.getElementById("cpfi").style.border = "";
	   return true;
	 }
   else
     {
        document.getElementById("cpfi").style.border = "thick solid red";
	   alert("Número de CPF inválido, use o formato 000.000.000-00");
	   return false;
     }
}




function femail(inputtxt)
{
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(inputtxt.value.match(re))
     {
        document.getElementById("emaili").style.border = "";
	   return true;
	 }
   else
     {
        document.getElementById("emaili").style.border = "thick solid red";
	   alert("E-mail inválido");
	   return false;
     }
}


function habcat(){

    document.getElementById('categoria').removeAttribute('readonly');

}


function discat(){

    document.getElementById('categoria').readOnly = true;

}

function phonenumber(inputtxt)
{
  var re = /\(\d{2}\)\s\d{5}\-\d{4}$/;
  if(inputtxt.value.match(re))
     {
        document.getElementById("phonei").style.border = "";
	   return true;
	 }
   else
     {
        document.getElementById("phonei").style.border = "thick solid red";
	   alert("Número de telefone inválido, utilize o formato (XX) XXXXX-XXXX");
	   return false;
     }
}


function verificasalario(inputtxt)
{
  var re = /\d{2}\.\d{3}\,\d{2}$/;
  if(inputtxt.value.match(re))
     {
        document.getElementById("salario").style.border = "";
	   return true;
	 }
   else
     {
        document.getElementById("salario").style.border = "thick solid red";
	   alert("Salário inválido, utilize o formato XX.XXX,XX");
	   return false;
     }
}

function getNum(val) {
    val = +val || 0
    return val;
 }

function calcularhtotal(){
    segunda= parseInt(document.getElementById("ch2").innerHTML)
    terca= parseInt(document.getElementById("ch3").innerHTML)
    console.log(terca)
    quarta= parseInt(document.getElementById("ch4").innerHTML)
    quinta= parseInt(document.getElementById("ch5").innerHTML)
    sexta= parseInt(document.getElementById("ch6").innerHTML)
    segunda = getNum(segunda)
    terca = getNum(terca)
    quarta = getNum(quarta)
    quinta = getNum(quinta)
    sexta = getNum(sexta)
    document.getElementById("htotal").innerHTML = segunda+terca+quarta+quinta+sexta;
    if((segunda+terca+quarta+quinta+sexta)<20 && (segunda!=0 && terca!=0 && quarta!=0 && quinta!=0 && sexta!=0))
    alert("Carga horária semanal insuficiente.");
    if((segunda+terca+quarta+quinta+sexta)>40)
    alert("Carga horária semanal excedente.");


}

function calcularhorario(dia){



    var horarioinicial = "hi" + dia
    console.log("aqui")
    var hinicial = document.getElementById(horarioinicial).textContent
    console.log(hinicial)

    var horariosaida = "hs" + dia
    console.log("aqui")
    var hsaida = document.getElementById(horariosaida).textContent
    console.log(hsaida)

    var horariodescanso = "hd" + dia
    console.log("aqui")
    var hdescanso = document.getElementById(horariodescanso).textContent
    console.log(hdescanso)

    if (hinicial.length != 0 && hsaida.length != 0 && hdescanso.length != 0) {
        console.log("nenhum vazio")
        var t1 = hinicial.split(":");
        var t2 = hsaida.split(":");
        var d1 = new Date(0,0,0,t1[0],t1[1]);
        var d2 = new Date(0,0,0,t2[0],t2[1]);
        var diff = d2.getTime() - d1.getTime();
        var hours = Math.floor(diff / 1000 / 60 / 60);
        diff -= hours * 1000 * 60 * 60;
        var minutes = Math.floor(diff / 1000 / 60);
        if (hours < 0)
        hours = hours + 24;
    console.log ((hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes);
    hours=hours-hdescanso;
    if (hours < 0)
        hours = hours + 24;
    if (hours > 10)
    alert("Carga horária do dia excedente.");
    document.getElementById("ch"+dia).innerHTML = hours;
    calcularhtotal()

    }




}


$('table td').on('blur', function () {
    console.log("blur new value : "+$(this).text());
    console.log("blur id : "+$(this).attr("id"));
    var re = /^([01][0-9]|2[0-3]):([0-5][0-9])$/;
    var horario = $(this).text();
    var id = $(this).attr("id");
    var dia = id.slice(-1);
    console.log(horario)
    if(!id.includes("hd")){
    if(horario.match(re))
       {
          document.getElementById("tabela").style.border = "";
          calcularhorario(dia);
         return true;
       }
     else
       {
          document.getElementById("tabela").style.border = "thick solid red";
         alert("Horário inválido na tabela, usar o formato HH:MM");
         return false;
       }
    }else{
        var re = /^\d+$/;
        if(horario.match(re)){
            document.getElementById("tabela").style.border = "";
            calcularhorario(dia);
            return true;
        }
        else{
            document.getElementById("tabela").style.border = "thick solid red";
            alert("Tempo de descanso errado na tabela, usar o formato H");
            return false;
        }

    }


  });

document.getElementById("nao").checked = true;

var List;
jQuery.ajax({
url: "https://servicodados.ibge.gov.br/api/v1/localidades/estados",
type: "GET",
dataType: "json",
"crossDomain": true,
async: true,
success: function (data) {
$('#ch_user2').empty();

$.each(data, function(teste,teste2) {
//console.log(val);//here data 
//console.log(key); //here key
$('#ch_user2').append('<option value="' + teste2['nome'] + '">' + teste2['nome'] + ' - ' + teste2['sigla'] +'</option>');

});}})


function preenche(inputtxt) {
    var List;
    jQuery.ajax({
    url: "https://viacep.com.br/ws/"+inputtxt.value+"/json/unicode/",
    type: "GET",
    dataType: "json",
    "crossDomain": true,
    async: true,
    success: function (data) {
        document.getElementById("cep").style.border = "";

    $.each(data, function(teste,teste2) {
    //console.log(val);//here data 
    //console.log(key); //here key
    //$('#titulo').type(teste2['titulo']);
    if(teste=="logradouro"){
    document.getElementById("logradouro").value = teste2;
}
if(teste=="localidade"){
document.getElementById("cidade").value = teste2;
}

if(teste=="complemento"){
    document.getElementById("complemento").value = teste2;
    }

    if(teste=="gia"){
        document.getElementById("numero").value = teste2;
        }
  
    });},
    error: function(){
        document.getElementById("cep").style.border = "thick solid red";
        alert('CEP inválido!');
      }


})
  }