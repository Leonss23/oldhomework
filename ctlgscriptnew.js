const prinfo = new Map();     //contains static shown product information.
const prdata = new Map();     //contains product data (img url and quantity).
const ctlgpnl = document.getElementById('ctlgpnl');
const infopanel = document.getElementById('infopanel');
const qtyctr = document.getElementsByClassName('qtyctr');


let loadid = 0;                                                     //Load products from localStorage.
while (localStorage.getItem('pr_name' + loadid)) {
    prinfo.set(loadid, {
        Name: localStorage.getItem('pr_name' + loadid),
        Price: localStorage.getItem('pr_price' + loadid),
        Model: localStorage.getItem('pr_model' + loadid)
    });
    prdata.set(loadid, {
        ImgURL: localStorage.getItem('pr_imgurl' + loadid),
        Qty: localStorage.getItem('pr_qty' + loadid)
    });
    let newprdiv = document.createElement('div');
    ctlgpnl.insertAdjacentElement("beforeend", newprdiv);
    newprdiv.classList.add('primg');
    newprdiv.style.backgroundImage = 'url(' + Object.values(prdata.get(loadid))[0] + ')';
    newprdiv.id = 'prdiv' + loadid;
    let newprqty = document.createElement('div');
    newprqty.classList.add('qtyctr');
    newprdiv.insertAdjacentElement("afterbegin", newprqty);
    if (localStorage.getItem('pr_qty' + loadid) > 0) {
        qtyctr[parseInt(loadid)].innerHTML = Object.values(prdata.get(parseInt(loadid)))[1];
        qtyctr[parseInt(loadid)].classList.add('shown');
    }
    loadid++;
}

ctlgpnl.onclick = show_info;


function show_info(event) {                                //show product info on click.
    let atvln = document.getElementsByClassName('infop');
    addcrtbtn.style.display = 'none';
    const atvlnlength = atvln.length;
    
    if (atvlnlength > 0) {
        for (let c = 0; c < (atvlnlength); c++) {
            infopanel.removeChild(atvln[0]);
        }
    }
    let prid = ('' + (event.target.id)).replace(/\D/g, '');
    //console.log('PrId: ' + prid);
    if (prid) {
        const lncnt = Object.keys(prinfo.get(parseInt(prid))).length;
        for (let c = 0; c < (lncnt); c++) {
            let newpinfo = document.createElement('p');
            infopanel.insertAdjacentElement("beforeend", newpinfo);
            newpinfo.classList.add('infop');
            newpinfo.innerHTML = ('' + ((Object.entries(prinfo.get(parseInt(prid))))[c])).replace(',', ': ');
            newpinfo.id = 'p' + c;
            addcrtbtn.style.display = 'inline-block';
        }
    }
    addcrtbtn.onclick = addcrt;                                     // +1 to cart. (and show +1 in quantity counter)
    function addcrt(event) {
        if (prid) {
            prdata.set(parseInt(prid), {
                ImgURL: localStorage.getItem('pr_imgurl' + prid),
                Qty: (parseInt(localStorage.getItem('pr_qty' + prid)) + 1)
            });
            localStorage.setItem('pr_qty' + prid, (parseInt(localStorage.getItem('pr_qty' + prid)) + 1));
            qtyctr[parseInt(prid)].innerHTML = Object.values(prdata.get(parseInt(prid)))[1];
            qtyctr[parseInt(prid)].classList.add('shown');
            console.log('added to cart');
        } else { console.log('No product selected.'); }
    }
}


//rstqty();
function rstqty() {
    let rstctr = 0;
    while (localStorage.getItem('pr_name' + rstctr)) {
        localStorage.setItem('pr_qty' + rstctr, 0);
        rstctr++;
    }
}
