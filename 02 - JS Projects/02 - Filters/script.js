
////generating product

let products = [
    {
        id : 01,
        name : "coca-cola",
        category : "drink",
        quantity : 10,
        price : 20
    },
    {
        id : 02,
        name : "cheese",
        category : "dairy",
        quantity : 30,
        price : 50
    },
    {
        id : 03,
        name : "maaza",
        category : "drink",
        quantity : 30,
        price : 10
    },
    {
        id : 04,
        name : "paneer",
        category : "dairy",
        quantity : 24,
        price : 70
    },
    {
        id : 05,
        name : "Lays",
        category : "snacks",
        quantity : 50,
        price : 10
    }
]


///displaying products
function displayProducts(displayList){
    document.getElementById('tbody').innerHTML='';
    displayList.forEach((product, index)=>{
        let row = document.createElement('tr');
        
        let num = document.createElement('td');
        num.append(index+1);
        // row.appendChild(num);

        let name = document.createElement('td');
        name.append(product.name);
        // row.appendChild(name);

        let category = document.createElement('td');
        category.append(product.category);
        // row.appendChild(category);

        let quantity = document.createElement('td');
        quantity.append(product.quantity);
        // row.appendChild(quantity);

        let price = document.createElement('td');
        price.append(product.price);
        // row.appendChild(price);

        row.append(num, name, category, quantity, price);

        document.getElementById('tbody').appendChild(row)
    })
}
displayProducts(products);




////filter panel show/hide button
let display = 'hide';
document.getElementById('btn').addEventListener('click', ()=>{
    
    if (display==='hide') {
        document.getElementById('filter_panel').style.marginLeft = 0;
        document.getElementById('wrapper').style.marginLeft = 20 + '%';
        display = 'show';
    } else {
        document.getElementById('filter_panel').style.marginLeft = -20 + '%';
        document.getElementById('wrapper').style.marginLeft = 0;
        display = 'hide';
    }
    
})



////genrating filter panel
function setFilterPanel(){
    let filterPanel = document.getElementById('filter_panel');

    let select = document.createElement('select');
    select.setAttribute('id', 'cate');
    let categories = [ 'select category', 'drink', 'dairy', 'snacks'];
    categories.forEach((category, index)=>{
        let option = document.createElement('option');
        option.append(category);
        select.appendChild(option);
    });
    select[0].setAttribute('value', '');

    let qtyField = document.createElement('input');
    qtyField.setAttribute('id', 'qty');
    qtyField.setAttribute('type', 'number');
    qtyField.setAttribute('placeholder', 'enter quantity');

    let minPrice = document.createElement('input');
    minPrice.setAttribute('id', 'min_price');
    minPrice.classList.add('min_price');
    minPrice.setAttribute('type', 'range');
    minPrice.setAttribute('min', '0');
    minPrice.setAttribute('max', '100');
    minPrice.value = 0;

    let maxPrice = document.createElement('input');
    maxPrice.setAttribute('id', 'max_price');
    maxPrice.classList.add('max_price');
    maxPrice.setAttribute('type', 'range');
    maxPrice.setAttribute('min', '0');
    maxPrice.setAttribute('max', '100');
    maxPrice.value = 100;

    let switchBtn = document.createElement('input');
    switchBtn.classList.add('switch_btn');
    switchBtn.setAttribute('id', 'switch_btn');
    switchBtn.setAttribute('type', 'checkbox');
    switchBtn.setAttribute('value', '');

    let findFilterBtn = document.createElement('button');
    findFilterBtn.setAttribute('id', 'find_btn');
    findFilterBtn.classList.add('find_btn');
    findFilterBtn.append('Find Filter');

    let resetFilterBtn = document.createElement('button');
    resetFilterBtn.setAttribute('id', 'reset_btn');
    resetFilterBtn.classList.add('reset_btn');
    resetFilterBtn.append('Reset Filter');

    document.querySelector('.switch_container').append( switchBtn)

    filterPanel.append( select, qtyField , minPrice , maxPrice, findFilterBtn, resetFilterBtn);

}
setFilterPanel();


////filter object
let filter = {
    category : '',
    quantity : null,
    minPrice : null,
    maxPrice : null
};




////functionality for filtering
function filtered(){
    let filteredProducts = products;
    
    if(filter.category!==''){
        filteredProducts = filteredProducts.filter((product,index)=>{
            return product.category.toLowerCase() === filter.category.toLowerCase();
        })
    }
    if(filter.quantity!==null){
        filteredProducts = filteredProducts.filter((product,index)=>{
            // console.log(Number(filter.quantity))
            // console.log(product.quantity)
            return Number(filter.quantity)<= product.quantity;
        })
    }
    if(filter.minPrice!==null){
        filteredProducts = filteredProducts.filter((product,index)=>{
            // console.log(Number(filter.minPrice))
            return Number(filter.minPrice)<= product.price;
        })
    }
    if(filter.maxPrice!==null){
        filteredProducts = filteredProducts.filter((product,index)=>{
            // console.log(Number(filter.maxPrice))
            return Number(filter.maxPrice)>= product.price;
        })
    }
    displayProducts(filteredProducts) ;  
}

if(filter.minPrice === 0){
    document.getElementById('max_price').value=100;
}

function PriceFilter(){
    document.getElementById('max_price').min = document.getElementById("min_price").value;
    document.getElementById('max_price').value = document.getElementById("min_price").value;
    filter.minPrice = Number(document.getElementById('min_price').value);
    if(filter.minPrice === 0){
        document.getElementById('max_price').value=100;
    }
    filter.maxPrice = Number(document.getElementById('max_price').value);
}

// document.getElementById('min_price').addEventListener('change', PriceFilter); 
// document.getElementById('max_price').addEventListener('change', PriceFilter);

function autoOn(){
    filter.category = document.getElementById('cate').value;
    filter.quantity = Number(document.getElementById('qty').value);
    
    PriceFilter();
    
    filtered();
}

function addEvents(){
    document.getElementById('cate').addEventListener('change', autoOn);
    document.getElementById('qty').addEventListener('keyup', autoOn); 
    document.getElementById('min_price').addEventListener('change', autoOn); 
    document.getElementById('max_price').addEventListener('change', autoOn);
}

let count = 1;

document.getElementById('switch_btn').addEventListener('click', ()=>{
    count++
    if (count % 2 === 0) {

        document.getElementById('find_btn').style.display = 'none';
        
        resetValue(); 

        addEvents();
    }else {
        resetValue();

        removeEvents();

        document.getElementById('find_btn').style.display = 'block';

        document.getElementById('find_btn').addEventListener('click', findFilter);
    }
});
    
document.getElementById('find_btn').addEventListener('click', findFilter);

function findFilter(){
    filter.category = document.getElementById('cate').value;
    filter.quantity = document.getElementById('qty').value;
    filter.minPrice = document.getElementById('min_price').value;
    filter.maxPrice = document.getElementById('max_price').value; 
    filtered();
}

document.getElementById('reset_btn').addEventListener('click', resetValue);


function resetValue(){
    filter = {
        category : '',
        quantity : null,
        minPrice : null,
        maxPrice : null
    };
    document.getElementById('cate').value='';
    document.getElementById('qty').value='';
    document.getElementById('min_price').value='0';
    document.getElementById('max_price').value='100';
    filtered();
}

function removeEvents(){
    document.getElementById('cate').removeEventListener('change', autoOn);
    document.getElementById('qty').removeEventListener('keyup', autoOn);
    document.getElementById('min_price').removeEventListener('change', autoOn);
    document.getElementById('max_price').removeEventListener('change', autoOn);
}








// sams code

// let count = 0;
// let x=false;
//     document.getElementById('switch_btn').addEventListener('click', ()=>{
//     console.log("before cond",x);
//     if(x===true){
//         x=false;
// console.log(false);
// console.log("after if ",x);
//     }
//     else if(x===false){
//         x=true;
//         console.log(true);

//     }
//     if (x) {
//         document.getElementById('cate').addEventListener('change', ()=>{
//             filter.category = document.getElementById('cate').value;
//             filtered();
//         });
        
//         document.getElementById('qty').addEventListener('keyup', ()=>{
//             filter.quantity = Number(document.getElementById('qty').value);
//             filtered();
//         });
        
//         document.getElementById('min_price').addEventListener('change', ()=>{
//             document.getElementById('max_price').min = document.getElementById("min_price").value;
//             document.getElementById('max_price').value = document.getElementById("min_price").value;
//             filter.minPrice = Number(document.getElementById('min_price').value);
//             filtered();
//             if(filter.minPrice === 0){
//                 document.getElementById('max_price').value=100;
//             }
//         });
        
//         document.getElementById('max_price').addEventListener('change', ()=>{
//             filter.maxPrice = Number(document.getElementById('max_price').value);
//             filtered();
//         });

//         document.getElementById('find_btn').style.display = 'none';

//     } else {
//         document.getElementById('find_btn').style.display = 'block';
//         document.getElementById('find_btn').addEventListener('click', ()=>{

//             filter.category = document.getElementById('cate').value;
//             filter.quantity = document.getElementById('qty').value;
//             filter.minPrice = document.getElementById('min_price').value;
//             filter.maxPrice = document.getElementById('max_price').value;
            
//             filtered();
//         });
//         count = 0;
//     }
// })
//    console.log('after', x) 