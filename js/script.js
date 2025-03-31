'use strict'
document.addEventListener('DOMContentLoaded', ()=> {
    const popup = document.querySelector('.popup');
    const popupOpenBtn = document.querySelectorAll('[data-popup]');

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
    popupOpenBtn.forEach(btn => {
        btn.addEventListener('click', ()=> {
            openPopupWindow();
        })
    });
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
    }
})