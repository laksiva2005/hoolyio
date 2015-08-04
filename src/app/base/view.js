/* 
 * @Author: somnath
 * @Date:   2015-06-25 16:49:17
 * @Last Modified by:   somnath
 * @Last Modified time: 2015-06-30 19:43:46
 */

'use strict';

define([
    'backbone',
    'app/base/viewManager',
    'backbone-validation'
], function(
    Backbone,
    ViewManager) {

    var View;


    View = Backbone.View.extend({
        constructor: function() {
            View.__super__.constructor.apply(this, arguments);
        },
        initialize: function() {
            View.__super__.initialize.apply(this, arguments);
        },
        className: 'row',
        render: function(context, template) {
            return this._render(context, template);
        },
        serialize: function() {
            var $form;
            if (this.$el.is('form')) {
                $form = this.$el;
            } else {
                $form = this.$('form');
            }
            return $form.serializeObject();
        },
        _render: function(context, template) {
            var html = '',
                hasError = false;
            template = template || (context && context.template) || this.template || '';
            if (context && context.template) {
                delete context.template;
            }
            try {
                html = ViewManager.renderTemplate(template, context);
            } catch (ex) {
                hasError = true;
                console.trace('Template Parse Error', ex);
            }
            if (!hasError) {
                this.$el.html(html);
            }
            return this;
        },
        close: function() {
            View.__super__.remove.apply(this);
            ViewManager.trigger('view:remove', this);
        },
        remove: function() {
            View.__super__.remove.apply(this);
            ViewManager.trigger('view:remove', this);
        }
    });

    _.extend(View.prototype, Backbone.Validation.mixin);

    _.extend(View.prototype, {
        validation: function(){},
        isValid: function(data) {
            var validations = _.result(this, 'validation');
            _.each(validations, function(validation, attr) {
                this.valid(attr);
            }, this);
            var errors = this.preValidate(data);
            if (errors) {
                _.each(errors, function(error, attr) {
                    this.invalid(attr, error);
                }, this);
                return false;
            }
            return true;
        },
        invalid: function(attr, error, selector) {
            selector = selector || 'name';
            this.$('[' + selector + '~="' + attr + '"]')
                .addClass('invalid')
                .attr('data-error', error);
        },
        valid: function(attr, selector) {
            selector = selector || 'name';
            this.$('[' + selector + '!="' + attr + '"]')
                .removeClass('invalid')
                .removeAttr('data-error');
        },
        attributes: function() {
            return [];
        }
    });

    return View;

});