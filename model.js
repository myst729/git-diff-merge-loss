const manufacturerInfo = {
  name: 'manufacturerInfoPage',
  title: 'Manufacturer Info',
  layout: {
    type: 'flow',
    labelPosition: 'top',
  },
  fields: [
    {
      name: 'manufacturerInfo',
      size: 4,
      render: 'table',
      showLabel: false,
      config: {
        groups: [
          {
            name: 'default',
            title: '',
            fields: [
              { name: 'manufacturerCode' },
              { name: 'language' },
              {
                name: 'countryObj',
                config: {
                  valueMode: 'object',
                },
              },
              {
                name: 'areaObj',
                config: {
                  valueMode: 'object',
                },
                restriction: {
                  type: 'object',
                  conditions: [
                    {
                      field: 'parentId',
                      operator: '=',
                      value: {
                        type: 'fieldValue',
                        sourceField: 'countryId',
                      },
                    },
                  ],
                },
              },
              {
                name: 'cityObj',
                config: {
                  valueMode: 'object',
                },
                restriction: {
                  type: 'object',
                  conditions: [
                    {
                      field: 'parentId',
                      operator: '=',
                      value: {
                        type: 'fieldValue',
                        sourceField: 'areaId',
                      },
                    },
                  ],
                },
              },
              {
                name: 'district',
                restriction: {
                  type: 'object',
                  conditions: [
                    {
                      field: 'parentId',
                      operator: '=',
                      value: {
                        type: 'fieldValue',
                        sourceField: 'cityId',
                      },
                    },
                  ],
                },
              },
              { name: 'address' },
              { name: 'creditCode' },
              { name: 'relateVendorCode' },
              { name: 'duns' },
              { name: 'employeeCount', render: 'integer-input-cooper', width: 150 },
              { name: 'yields', render: 'decimal-input-cooper', width: 150 },
              {
                name: 'enclosureFile',
                render: 'pop-table-cooper',
                config: {
                  size: 'huge',
                  groups: [
                    {
                      name: 'default',
                      title: '',
                      fields: [
                        { name: 'className' },
                        {
                          name: 'effectDateStartEnd',
                          render: 'date-picker-cooper',
                          width: 400,
                          config: {
                            valueFormat: 'YYYY-MM-DD',
                          },
                        },
                        {
                          name: 'file',
                          render: 'upload-single',
                        },
                      ],
                    },
                  ],
                  editMode: 'all',
                  operations: [],
                },
              },
            ],
          },
        ],
        editMode: 'all',
        operations: ['create', 'remove'],
      },
    }
  ]
}
