const prinfo = new Map();     //contains static shown product information.
const prdata = new Map();     //contains product data (img url and quantity).
const container2 = document.getElementById('container2');
const ttlprc = document.getElementById('ttlprc');


let loadid = 0;                                                     //Load products from localStorage.
while (localStorage.getItem('pr_name' + loadid) && loadid < 50) {
    prinfo.set(loadid, {
        Name: localStorage.getItem('pr_name' + loadid),
        Price: localStorage.getItem('pr_price' + loadid),
        Model: localStorage.getItem('pr_model' + loadid)
    });
    prdata.set(loadid, {
        ImgURL: localStorage.getItem('pr_imgurl' + loadid),
        Qty: localStorage.getItem('pr_qty' + loadid)
    });
    if (Object.values(prdata.get(parseInt(loadid)))[1] > 0) {
        let newprdiv = document.createElement('div');
        let newprnum = document.createElement('input');
        let newprimg = document.createElement('div');
        let newprtxt = document.createElement('div');
        let newprdel = document.createElement('p');
        newprdiv.classList.add('listpr');
        newprnum.classList.add('listnum');
        newprimg.classList.add('listimg');
        newprtxt.classList.add('listtxt');
        newprdel.classList.add('listdel');
        newprdiv.id = 'prc_div' + loadid;
        newprnum.id = 'prc_num' + loadid;
        newprimg.id = 'prc_img' + loadid;
        newprtxt.id = 'prc_txt' + loadid;
        newprdel.id = 'prc_del' + loadid;
        container2.insertAdjacentElement("beforeend", newprdiv);
        newprdiv.insertAdjacentElement("beforeend", newprnum);
        newprdiv.insertAdjacentElement("beforeend", newprimg);
        newprdiv.insertAdjacentElement("beforeend", newprtxt);
        newprdiv.insertAdjacentElement("beforeend", newprdel);
        newprnum.type = 'number'; newprnum.max = 99; newprnum.min = 1;
        newprnum.value = Object.values(prdata.get(parseInt(loadid)))[1];
        newprimg.style.backgroundImage = 'url(' + Object.values(prdata.get(parseInt(loadid)))[0] + ')';
        const lncnt = Object.keys(prinfo.get(parseInt(loadid))).length;
        let newprtxtin = ('' + ((Object.entries(prinfo.get(parseInt(loadid))))[0])).replace(',', ': ');
        for (let c = 1; c < (lncnt); c++) {
            newprtxtin = newprtxtin + '</br>' + ('' + ((Object.entries(prinfo.get(parseInt(loadid))))[c])).replace(',', ': ');
        }
        newprtxt.innerHTML = newprtxtin;
        newprdel.innerHTML = '&#x2715';
        newprnum.oninput = function updateqty() {
            let numid = parseInt((newprnum.id).replace(/\D/g, ''));
            localStorage.setItem('pr_qty' + numid, newprnum.value);
            prdata.set(numid, {
                ImgURL: localStorage.getItem('pr_imgurl' + numid),
                Qty: newprnum.value
            });
            ttlprcupd();
        }
        newprdel.onclick = function rmvpr() {
            let rmvid = parseInt((newprdel.id).replace(/\D/g, ''));
            container2.removeChild(document.getElementById('prc_div' + rmvid));
            localStorage.setItem('pr_qty' + rmvid, 0);
            prdata.set(rmvid, {
                ImgURL: localStorage.getItem('pr_imgurl' + rmvid),
                Qty: 0
            });
            ttlprcupd();
        }
    }
    loadid++;
}

ttlprcupd();

function ttlprcupd() {
    let totalprice = 0;
    for(let c = 0 ; c < (prdata.size) ; c++){
        if (parseInt((Object.values(prinfo.get(c))[1]))){
        totalprice = totalprice + parseInt((Object.values(prinfo.get(c))[1]) * parseInt(Object.values(prdata.get(c))[1]));
        }
    }
    ttlprc.innerHTML='Total: $'+totalprice;
};

/*To do: 
https://m.media-amazon.com/images/I/61yx3uRbbnL._SX466_.jpg
*/