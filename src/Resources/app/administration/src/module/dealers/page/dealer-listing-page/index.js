import template from './dealer-listing-page.html.twig';
import './dealer-listing-page.scss';

const {Component, Mixin} = Shopware;
const {Criteria} = Shopware.Data;

Component.register('dealer-listing-page', {
    template,

    inject: [
        'repositoryFactory',
        'acl'
    ],

    mixins: [
        Mixin.getByName('listing'),
        Mixin.getByName('notification')
    ],

    metaInfo() {
        return {
            title: 'Dealers overview'
        };
    },

    data() {
        return {
            dealers: null,
            isLoading: false
        };
    },

    computed: {
        dealerRepository() {
            return this.repositoryFactory.create('dealer');
        }
    },

    createdComponent() {
        this.getList();
    },

    methods: {
        getCriteria() {
            const criteria = new Criteria(this.page, this.limit);

            if (this.term) {
                criteria.setTerm(this.term);
            }

            criteria.addSorting(
                Criteria.sort('name', 'ASC')
            );

            return criteria;
        },

        getList() {
            this.isLoading = true;
            this.dealerRepository.search(this.getCriteria(), Shopware.Context.api).then(result => {
                this.dealers = result;
                this.total = result.total;
                return result;
            }).finally(() => {
                this.isLoading = false;
            });
        },

        onInlineEditSave(dealer) {
            dealer.save();
        },

        getGridColumns() {
            return [{
                property: 'name',
                label: 'dealers.listing.name',
                routerLink: 'swag.training.dealers.form',
                allowResize: true,
                primary: true
            }, {
                property: 'description',
                label: 'dealers.listing.description',
                allowResize: true
            }, {
                property: 'address',
                label: 'dealers.listing.address',
                allowResize: true
            }]
        }
    }
});
