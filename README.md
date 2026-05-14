# WinterCMS Mall theme

The Mall Theme is a simple theme built on Tailwind CSS for the e-commerce plugin [wn-mall-plugin](https://github.com/wintercms/wn-mall-plugin).

## Requirements

 - Winter CMS 1.2.8 or above.
 - Winter.Mall plugin 2.1.0 or above.
 - NodeJS 12 or above, if you wish to style the theme.


## Development

The theme is built on Tailwind CSS, which is built using the NodeJS framework. To be able to compile any changes made to the styling or content, you must use the Vite commands that are included with Winter CMS 1.2.0+.

You must first install the Node dependencies required for the theme.

```bash
php artisan vite:install -p theme-mall
```

Then, to compile the Tailwind CSS styles for development, run the following command in the root folder of the project:

```bash
php artisan mix:compile -p theme-mall
```

To compile the Tailwind CSS styles for production (which should be done if you commit any changes to the mall theme), you must add the `--production` flag to the above command:

```bash
php artisan mix:compile -p theme-mall --production
```

To make it easy to develop the theme, you can also watch the necessary template and stylesheet files for any changes:

```bash
php artisan mix:watch   
```


## 🏆 Credits

This plugin is a fork of the fantastic [Offline.mall](https://github.com/wintercms/wn-mall-plugin) plugin, adapted for WinterCMS with their friendly permission.
A big thank you to them for this remarkable work.
