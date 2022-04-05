let BDusr = ["Pablito", "Marcos", "Leonss23"];
let BDpwd = ["1234", "xdxd", "2323@"];

function login() {
    let usr = document.getElementById("USRin").value;
    let pwd = document.getElementById("PWDin").value;
    if (usr.length > 3 && pwd.length > 3) {
        console.log('User: ' + usr + ' Password: ' + pwd);
        let usrexists = 0;
        let pwdcorrect = 0;
        let count = 0;
        BDusr.forEach(function (v, i, a) {
            count++;
            if (usr == v) {
                console.log('User Index= ' + i)
                usrexists = 1;
                if (pwd == BDpwd[i]) {
                    pwdcorrect = 1;
                }
            }
            if (count == BDusr.length) {
                console.log('User exists: ' + usrexists + ' Password correct: ' + pwdcorrect);
                if (usrexists == 1) {
                    console.log('User exists');
                    if (pwdcorrect == 1) {
                        console.log('Password correct\nLogged in.');
                    } else console.log('Password incorrect');
                } else console.log("User doesn't exist");
            }
        });
    } else console.log('Credentials are too short. (4 or more characters required.)');
    console.log('\n\n\n\n');
}

function addUser() {
    let newusr = document.getElementById('USRin').value;
    let newpwd = document.getElementById('PWDin').value;
    if (newusr.length > 3 && newpwd.length > 3) {
        let newusrexists = 0;
        let count = 0
        BDusr.forEach(function (v, i, a) {
            count++;
            if (newusr == v) {
                newusrexists = 1;
                console.log("User can't be added, as it already exists.")
            }
            if (count == BDusr.length) {
                if (newusrexists == 0) {
                    BDusr.push(newusr);
                    BDpwd.push(newpwd);
                    console.log('User added: ' + BDusr[BDusr.length - 1] + '    Password: ' + BDpwd[BDpwd.length - 1]);
                }
            }
        });
    } else console.log('Credentials are too short. (4 or more characters required.)');
    console.log('\n\n\n\n');
}

function resetPwd() {
    let usr = document.getElementById('USRin').value;
    let newpwd = document.getElementById('PWDin').value;
    if (usr.length > 3 && newpwd.length > 3) {
        let count = 0;
        let usrexists = 0;
        let usrindex;
        BDusr.forEach(function (v, i, a) {
            count++;
            if (usr == v) {
                usrexists = 1;
                usrindex = i;
            }
            if (count == BDusr.length) {
                if (usrexists == 1) {
                    BDpwd[usrindex] = newpwd;
                    console.log("Password for user: " + BDusr[usrindex] + " changed to: " + BDpwd[usrindex] + '.');
                } else console.log("User doesn't exist.");
            }
        });
    } else console.log('Credentials are too short. (4 or more characters required.)');
    console.log('\n\n\n\n');
}