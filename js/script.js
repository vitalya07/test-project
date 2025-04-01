'use strict'
document.addEventListener('DOMContentLoaded', ()=> {
    const popup = document.querySelector('.popup');
    const popupOpenBtn = document.querySelector('[data-popup]');
    const productWrapper = document.querySelector('.product__wrapper');

    function openPopupWindow() {
        popup.classList.add('open');
        popup.classList.remove('exit')
        document.body.style.overflow = 'hidden';
    };

    function exitPopupWindow() {
        popup.classList.add('exit');
        popup.classList.remove('open');
        document.body.style.overflow = '';
    }
    popupOpenBtn.addEventListener('click', ()=> {
        openPopupWindow();
    });
    productWrapper.addEventListener('click', (e)=> {
        if(e.target.classList.contains('product__item-btn')) {
            openPopupWindow();
        }
    })
    popup.addEventListener('click', (e)=> {
        const target = e.target;
        if(popup == target || target.classList.contains('popup__content-close')) {
            exitPopupWindow();
        }
    });
    window.addEventListener('keydown', (e)=> {
        if(e.code === 'Escape' && popup.classList.contains('open')) {
            exitPopupWindow();
        }
    });

    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        bindPostdata(form);
    })
    const postData = async (url, body)=> {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'type-content': 'aplication/json'
            },
            body: body
        });
        return await res.json();
    };
    function bindPostdata(form) {
        form.addEventListener('submit', (e)=> {
            e.preventDefault();
            const modalSucces = document.querySelector('.modal__succes');
            const modalError  = document.querySelector('.modal__error');
            const formData = new FormData(form);
            const object = {};
            formData.forEach((value, key)=> {
                object[key]= value
            });
            postData('php/server2.php', JSON.stringify(object))
            .then(()=> {
                modalSucces.style.display = 'block';
                setTimeout(()=> {
                    modalSucces.style.display = 'none'
                }, 2000)
            }).catch(()=> {
                modalError.style.display = 'block';
                setTimeout(()=> {
                    modalError.style.display = 'none';
                }, 2000)
            }).finally(()=> {
                form.reset();
            })
        })
    };
    //Классы
    class cofeCart {
        constructor(src, alt, title, descr, btn, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.btn = btn;
            this.parent = document.querySelector(parentSelector)
        }
        render() {
            const element = document.createElement('div');
            element.innerHTML = `
                <div class="product__item">
                    <div class="product__item-img">
                        <img src=${this.src} alt=${this.alt}>
                    </div>
                    <h2 class="product__item-title">${this.title}</h2>
                    <div class="product__item-descr">${this.descr}</div>
                    <button data-popup class="product__item-btn">${this.btn}</button>
                </div>
            `;
            this.parent.append(element);
        }
    }
    new cofeCart(
        "img/capuchino.webp",
        "kofe",
        "Капучино",
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus odio, modi reiciendis accusantium velit commodi quis laboriosam laudantium praesentium sequi!",
        "Заказать",
        ".container .product__wrapper"
    ).render();
    new cofeCart(
        "img/americano.webp",
        "kofe",
        "Американо",
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus odio, modi reiciendis accusantium velit commodi quis laboriosam laudantium praesentium sequi!",
        "Заказать",
        ".container .product__wrapper"
    ).render();
    new cofeCart(
        "img/expresso.webp",
        "kofe",
        "Экспрессо",
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus odio, modi reiciendis accusantium velit commodi quis laboriosam laudantium praesentium sequi!",
        "Заказать",
        ".container .product__wrapper"
    ).render();
})