import template from './dealer-listing.html.twig';
import './dealer-listing.scss';

const { Component } = Shopware;

Component.register('dealer-listing', {
    template,
    props: {
        title: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        }
    }
});
