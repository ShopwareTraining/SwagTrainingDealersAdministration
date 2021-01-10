import template from './dealer-form-page.html.twig';
import './dealer-form-page.scss';

const {Component, Mixin} = Shopware;

Component.register('dealer-form-page', {
    template,

    inject: [
        'repositoryFactory',
        'acl'
    ],

    mixins: [
        Mixin.getByName('notification'),
        Mixin.getByName('placeholder')
    ],

    metaInfo() {
        return {
            title: 'Dealers form'
        };
    },

    data() {
        return {
            dealer: {},
            isLoading: false,
            isSaveSuccessful: false
        };
    },

    computed: {
        identifier() {
            return this.placeholder(this.dealer, 'name');
        },
        dealerRepository() {
            return this.repositoryFactory.create('dealer');
        }
    },

    watch: {
        dealerId() {
            if (!this.dealerId) {
                this.createdComponent();
            }
        }
    },

    created() {
        this.getDealer();
    },

    methods: {
        getDealer() {
            this.isLoading = true;
            if (!this.dealerId) {
                this.dealerId = this.$route.query.id;
                if (!this.dealerId) {
                    this.dealerId = this.$route.params.id;
                }

                this.dealerRepository.get(this.dealerId, Shopware.Context.api).then((result) => {
                    this.dealer = result;
                    this.isLoading = false;
                });
            }
        },

        loadEntityData() {
            this.dealer = this.dealerRepository.get(this.dealerId, Shopware.Context.api).then((dealer) => {
                this.dealer = dealer;
            });
        },

        saveFinish() {
            this.isSaveSuccessful = false;
        },

        onSave() {
            this.isSaveSuccessful = false;
            this.isLoading = true;

            return this.dealerRepository.save(this.dealer, Shopware.Context.api).then(() => {
                this.isSaveSuccessful = true;
                if (!this.dealerId) {
                    this.$router.push({ name: 'dealer.form', params: { id: this.dealer.id } });
                }

                this.dealerRepository.get(this.dealer.id, Shopware.Context.api).then((updatedCurrency) => {
                    this.dealer = updatedCurrency;
                    this.isLoading = false;
                });
            }).catch(() => {
                this.createNotificationError({
                    message: this.$tc('detail.form.notificationErrorMessage')
                });
                this.isLoading = false;
            });
        },

        onCancel() {
            this.$router.push({ name: 'dealer.index' });
        },
    }
});
