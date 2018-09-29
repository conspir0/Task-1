// Form Constructor  ---------------------------------------------
const FormValidate = function(form, options) {
    const defaultOptions = {
        classError : 'error',
        classOk : 'ok'
    }

    this.form = form;
    this.options = Object.assign({}, defaultOptions, options);

    //wyłączamy htmlową walidację
    this.form.setAttribute('novalidate', 'novalidate');

    this.prepareElements();
    this.bindSubmit();
};

// Prototype - preprare elements to veryfication  ---------------------------------------------
FormValidate.prototype.prepareElements = function() {
    const elements = this.form.querySelectorAll('[required]');

    // Pętla po elementach
    [].forEach.call(elements, function(element) {
        
        // Sprawdzamy typ pola
        if (element.nodeName.toUpperCase() === 'INPUT') {
            const type = element.type.toUpperCase();

            // Dla każdego pola dodajemy obsługę funkcji sprawdzającej
            if (type === 'TEXT') {
                element.addEventListener('input', function(e) {
                    this.testInputText(e.target);
                }.bind(this));
            }

            if (type === 'EMAIL') {
                element.addEventListener('input', function(e) {
                    this.testInputEmail(e.target);
                }.bind(this));
            }
            
            if (type === 'NUMBER') {
                element.addEventListener('input', function(e) {
                    this.testInputNumber(e.target);
                }.bind(this));
            }
        }
        
        if (element.nodeName.toUpperCase() === 'TEXTAREA') {
            element.addEventListener('input', function(e) {
                this.testInputText(e.target);
            }.bind(this));
        }
        
    }, this);
};

// Prototype - show validation  ---------------------------------------------
FormValidate.prototype.showFieldValidation = function(input, inputIsValid) {
    if (!inputIsValid) {
        input.classList.add(this.options.classError);
        input.classList.remove(this.options.classOk);
        
    } else {
        input.classList.remove(this.options.classError);
        input.classList.add(this.options.classOk);
    }
};

// Prototype - test email  ---------------------------------------------
FormValidate.prototype.testInputEmail = function(input) {
    const mailReg = /^[\w-]+@[a-zA-Z0-9.-]+\.[a-z]{2,3}$/;

    if (!mailReg.test(input.value)) {
        this.showFieldValidation(input, false);
        return false;
        
    } else {
        this.showFieldValidation(input, true);
        return true;
    }
};

// Prototype - test text  ---------------------------------------------
FormValidate.prototype.testInputText = function(input) {
    const textReg = /^[a-zA-Z0-9\s]{3,}$/;

    if (!textReg.test(input.value)) {
        this.showFieldValidation(input, false);
        return false;
        
    } else {
        this.showFieldValidation(input, true);
        return true;
    }
};

// Prototype - text number  ---------------------------------------------
FormValidate.prototype.testInputNumber = function(input) {
    const numberReg = /^[0-9]{9,}$/;

    if (!numberReg.test(input.value)) {
        this.showFieldValidation(input, false);
        return false;
        
    } else {
        this.showFieldValidation(input, true);
        return true;
    }
};

// Prototype - validation during the submit  ---------------------------------------------
FormValidate.prototype.bindSubmit = function() {
    this.form.addEventListener('submit', function(e) {
        e.preventDefault();

        let formIsValidated = true;
        const elements = this.form.querySelectorAll('[required]');

        [].forEach.call(elements, function(element) {
            if (element.nodeName.toUpperCase() === 'INPUT') {
                const type = element.type.toUpperCase();

                if (type === 'TEXT') {
                    element.addEventListener('input', function(e) {
                        this.testInputText(e.target);
                    }.bind(this));
                }

                if (type === 'EMAIL') {
                    element.addEventListener('input', function(e) {
                        this.testInputEmail(e.target);
                    }.bind(this));
                }

                if (type === 'NUMBER') {
                    element.addEventListener('input', function(e) {
                        this.testInputNumber(e.target);
                    }.bind(this));
                }
            }

            if (element.nodeName.toUpperCase() === 'TEXTAREA') {
                element.addEventListener('input', function(e) {
                    this.testInputText(e.target);
                }.bind(this));
            }
        }, this);

        if (formIsValidated) {
            e.target.submit();
        } else {
            return false;
        }
    }.bind(this));
};

// Make my form alive
document.addEventListener("DOMContentLoaded", function() {
    const cfg = {};
    const form = new FormValidate(document.querySelector('.form'), cfg);
});