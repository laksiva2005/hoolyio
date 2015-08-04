'use strict';

define([
    'app/base/view',
    'text!auth/templates/register.html'
], function(BaseView, registerTemplate){

    var RegisterView = BaseView.extend({
        events: function(){
            return {
                'submit': 'onSubmit'
            };
        },
        render: function(context, template){
            RegisterView.__super__.render.apply(this, [context, template || registerTemplate]);
            this.$('select').material_select();
            this.$('.datepicker.dob').pickadate({
                selectMonths: true,
                selectYears: 100,
                max: new Date()
            });
            return this;
        },
        onSubmit: function(event){
            event.preventDefault();
            var data = this.serialize();
            this.trigger('register', data);
            return false;
        }
    });

    return RegisterView;
});