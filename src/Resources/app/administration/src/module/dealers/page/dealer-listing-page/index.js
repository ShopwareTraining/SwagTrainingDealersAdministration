import template from './dealer-listing-page.html.twig';
import './dealer-listing-page.scss';

const {Component, Mixin} = Shopware;
const {Criteria} = Shopware.Data;

Component.register('dealer-listing-page', {
    template,

    inject: [
        'repositoryFactory',
        'stateStyleDataProviderService',
        'acl'
    ],

    mixins: [
        Mixin.getByName('listing')
    ],

    metaInfo() {
        return {
            title: 'Dealers overview'
        };
    },

    data() {
        return {
            dealers: [],
            total: NaN,
            page: 0,
            isLoading: false,
            sortBy: 'name'
        };
    },

    computed: {
        dealerRepository() {
            return this.repositoryFactory.create('dealer');
        }
    },

    created() {
        this.getList();
    },

    methods: {
        getCriteria() {
            const criteria = new Criteria();

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
            const criteria = this.getCriteria();
            this.dealerRepository.search(criteria, Shopware.Context.api).then((items) => {
                this.total = items.total;
                this.dealers = items;
                return items;
            }).finally(() => {
                this.isLoading = false;
            });
        },

        onInlineEditSave(order) {
            order.save();
        },

        getGridColumns() {
            return [{
                property: 'name',
                label: 'dealers.listing.name',
                routerLink: 'dealers.form',
                allowResize: true,
                primary: true
            }, {
                property: 'description',
                label: 'dealers.listing.description',
                routerLink: 'dealers.form',
                allowResize: true
            }, {
                property: 'address',
                label: 'dealers.listing.address',
                allowResize: true
            }, {
                property: 'updatedAt',
                label: 'sw-settings-rule.list.columnDateCreated',
                align: 'right',
                allowResize: true
            }];
        }
    }
});
