# TinyMCE Merge fields plugin

TinyMCE merge fields is a plugin that makes it easier to work with variables in text. A lot of web applications today allow users to write content with variables. Server side these variables can then be replaced with actual data. There are many large companies that use this kind of functionality but a lot of these implementations are not very user friendly.

With this project we provide a user-friendly implementation of such a feature nicely packaged as a TinyMCE plugin.

## Demo
[Demo of this plugin](https://eventival.github.io/tinymce-merge-fields-plugin/)

## Usage
```javascript
tinymce.init({
  selector: "textarea.tinymce",
  plugins: "code merge-fields",
  toolbar: "merge-fields-sidebar",
  font_css: "sidebar.css",
  merge_fields: [
    {
        name: "user",
        items: [
          {
              name: "firstName",
              value: "{{user.firstName}}",
              help: "Loggedin user's first name"
          },
          {
            name: "lastName",
            value: "{{user.lastName}}"
          },
        ]
    }
  ],
});
```
## Options
| Option | description | default |
---|---|---|
| merge_fields | Your merge field tree | [] |
| merge_field_prefix | Your merge field prefix | `{{`
| merge_field_suffix | Your merge field suffix | `}}`
| merge_field_separator | Merge field path separator. Set to `null` if you don't want to show the path in editor | `>`

## Contributing
1. Fork it!
2. Create your feature branch: git checkout -b my-new-feature
3. Commit your changes: git commit -m 'Add some feature'
4. Push to the branch: git push origin my-new-feature

## Develop
To start a HTTP server to test your changes you can run following command and open http://localhost:8000/src/demo/html/index.html  URL in your browser.
```shell
yarn start
```
Make sure to run the tests before pushing code or submitting any pull request using:
```shell
yarn test
```

## Inspired by:
This plugin is inspired by [TinyMce variable](https://github.com/ambassify/tinymce-variable) plugin

## License

[MIT License](http://opensource.org/licenses/MIT)