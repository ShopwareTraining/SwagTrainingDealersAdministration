import './page/dealer-listing-page';
import './page/dealer-form-page';

const { Module } = Shopware;

Module.register('swag-training-dealers', {
    type: 'plugin',
    name: 'dealers',
    title: 'dealers.general.mainMenuItemGeneral',
    description: 'dealers.general.descriptionTextModule',
    version: '0.0.1',
    targetVersion: '0.0.1',
    color: '#FFCC00',
    icon: 'default-device-dashboard',
    favicon: 'icon-module-dashboard.png',

    routes: {
        index: {
            components: {
                default: 'dealer-listing-page'
            },
            path: 'index'
        },
        form: {
            components: {
                default: 'dealer-form-page'
            },
            path: 'form'
        }
    },

    navigation: [{
        id: 'dealers.listing',
        label: 'dealers.general.mainMenuItemGeneral',
        color: '#FFCC00',
        icon: 'default-device-dashboard',
        path: 'swag.training.dealers.index',
        position: 1
    }]
});
