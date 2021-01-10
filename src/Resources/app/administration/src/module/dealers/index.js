import './page/dealer-listing-page';
import './component/dealer-listing';
import enGB from './snippet/en-GB.json';

const { Module } = Shopware;

Module.register('yireo-example-dealers', {
    type: 'plugin',
    name: 'dealers',
    title: 'dealers.general.mainMenuItemGeneral',
    description: 'dealers.general.descriptionTextModule',
    version: '0.0.1',
    targetVersion: '0.0.1',
    color: '#FFCC00',
    icon: 'default-device-dashboard',
    favicon: 'icon-module-dashboard.png',

    snippets: {
        'en-GB': enGB
    },

    routes: {
        index: {
            components: {
                default: 'dealer-listing-page'
            },
            path: 'index'
        }
    },

    navigation: [{
        id: 'dealers.listing',
        label: 'dealers.general.mainMenuItemGeneral',
        color: '#FFCC00',
        icon: 'default-device-dashboard',
        path: 'yireo.example.dealers.index',
        position: 1
    }]
});
