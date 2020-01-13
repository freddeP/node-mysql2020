module.exports = function(content,errors=""){

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Node Mysql</title>
            <style>

            *{
                box-sizing: border-box;
                padding: 0;
                margin:0;
                font-family: monospace;
            }
            input, textarea{
                width:100%;
                font-size:1.3rem;
                display:block;
                padding:1%;
            }
            header{
                min-height:10vh;
                padding:1%;
            }
            a{
                color:#303030;
                
            }
            a:hover{
                color:#000;
            }
            main div{
                padding:3%;
                border-bottom:1px solid #ddd;
                margin-bottom:2rem;
            }
            
        
        </style>
        </head>
        <body>
            <header>
                <a href="/">Home</a> | <a href="/create">Create Post</a>
        
            </header>
          
            ${errors ? errors : ""}
            <main>
                ${content}
            </main>
            
        </body>
        </html>

    `;



}