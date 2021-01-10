Shopware.Service('privileges')
    .addPrivilegeMappingEntry({
        category: 'permissions',
        parent: 'settings',
        key: 'dealers',
        roles: {
            editor: {
                privileges: [
                    'dealers:update',
                    'dealers:delete',
                    'dealers:create'
                ]
            }
        }
    });
