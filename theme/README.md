# rack static boilerplate

Use git (it's good!) and deploy your static html/css to Heroku - for free.

Inside your project's directory:

    /config.ru  <-- copy it from this repo
    /public/    <-- throw here all your static files

If you're not using git yet, install it and start using it right now:

    `git init .`
    `git add *`
    `git commit -am "first commit"`

If you're already using git, just commit your last changes:

    git commit -am "preparing to serve from Heroku"

If you don't have a Heroku account, [signup](http://www.heroku.com/signup) (it's free) and then install the heroku gem:

    gem install heroku

Create a heroku app.

    heroku create

Deploy

    git push heroku master && heroku open

Enjoy: you can visit your `/public/index.html` file as `/`, `/index` or `/index.html`.
Any other `/foo/bar.html` will be served also from `/foo/bar`.

In the future:

- commit your changes with git

    git add *
    git commit -am "describe your changes"

- deploy again to heroku

    git push heroku master

Bonus:

- rename your app:

    heroku rename new-name

- Heroku is an awesome platform, [learn more about it...](http://devcenter.heroku.com/)
