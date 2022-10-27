# Socket server 
//recostruir modulos de nod 
npm install 

//generar dist
tsc -w

//levantar servidor
nodemon dist/
node dist/

//git 
git init
git status
git add .
git commit -m "inicio server-01"
//github crear repo
nombre: udemy-angular-socket-server

git remote add origin https://github.com/julioAzocar/udemy-angular-socket-server.git
git branch -M main
git push -u origin main
