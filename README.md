<style>
body {direction:rtl}
pre,code{direction:ltr;}
a,em,strong{color:coral;}
</style>

# کنسول مدیریت برنامه ها
پروژه مدیریت برنامه های شرکت شونیز. این پروژه اولین پروژه نوشته شده با تکنولوژی Node.js میباشد.

## نحوه تنظیم پروژه
برای داشتن فایلهای پروژه بر روی کامپیوتر خود به همراه امکان بروز رسانی فایلها  از دستورات زیر پیروی کنید:

1. نرم افزار git را از  [اینجا](https://git-scm.com/download/win) دانلود کنید
2. نرم افزار git را نصب کنید (برای این منظور میتوانید از آقایان خسروی فر یا فردوس یا ذاکری کمک بگیرید)
* یک پوشه بر روی کامپیوتر خود بنام **umconsole** بسازید
* کنسول **cmd** را اجرا کرده و به پوشه ساخته شده بروید
* دستورات زیر را در کنسول اجرا کنید:

```sh
git init
git remote add origin https://github.com/ghandfrooshan/umcosole.git
git config push.default simple
git config pull.default simple
git config --global credential.helper wincred
git config --global user.name "<YourNameInGithub>"
git config --global user.email <YourEmailInGithub>
git config user.name "<YourNameInGithub>"
git config user.email <YourEmailInGithub>
git pull origin master
git branch --set-upstream-to=origin/master
git push --set-upstream origin master
```
 