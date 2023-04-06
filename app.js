//change background color using JavaScript DOM

// steps


//Global  variables
let toastMsg = null

// 1. create onload handler
window.onload = function() {
    main()
}

//2. random HeXa color generator
function randomColor(){
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    
    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
}

// 3. create main function
function main() {
    const root = document.getElementsByClassName('root')[0] // background
    const btn = document.getElementsByClassName('btn')[0] // button
    const output = document.getElementById('output') // output input both 
    
    btn.addEventListener('click', function(){
        const bgColor = randomColor()
        root.style.backgroundColor = bgColor // change Background Color
        btn.style.color = bgColor // Change Button Text color 
         output.value = bgColor.toUpperCase().substring(1)

    })

    //step 4: copy color code from output
    const copy = document.getElementById('copy')
    copy.addEventListener('click', function(){
        navigator.clipboard.writeText(`#${output.value}`)

        //remove existing toast message
        if(toastMsg !== null){
            toastMsg.remove();
        }
        if(isValidHex(output.value)){
            generateToastMsg(`#${output.value} copied`)
        }else{
            console.log('Invalid color code');
            alert('Invalid color code');
        }
       
    })

    // step 5: active toast message
    function generateToastMsg(msg){
        toastMsg = document.createElement('p')

        // step 6: create dynamic toast message (color code)
        toastMsg.innerText = msg
        document.body.appendChild(toastMsg)
        // toastMsg.classList.add("toast-message") // anther way to add class below
        toastMsg.className = 'toast-message toast-msg-in'
        console.log('color copied');

        // remove the toast message when user clicks inside the toast message
        toastMsg.addEventListener('click', function(){
            toastMsg.classList.remove('toast-msg-in');
            toastMsg.classList.add('toast-msg-out');


            // step 7: clear toast message
            // remove toast message permanently when user clicked  it.
            toastMsg.addEventListener("animationend", function(){
                toastMsg.remove();
                toastMsg = null;v // remove previous toast message 
            })
        });

        setTimeout(() => {
            document.body.removeChild(toastMsg)
        }, 4000)
    }

    //step 9: create isHexValid function
    function isValidHex(color){
        if(color.length !== 6 ) return false;
        return /^[0-9A-Fa-f]{6}$/i.test(color) // checking color is valid using Regx 
       
    }

    // Step 10: implement change handler on input field
    output.addEventListener('keyup', function(e){
        const color = e.target.value
        // console.log(e);
        if (color){
            output.value = color.toUpperCase()
            if(isValidHex(color)){
                root.style.backgroundColor = `#${color}`
                console.log(e);
            }
        }
    })

    // step 11: prevent copying hex code if it is not valid
}