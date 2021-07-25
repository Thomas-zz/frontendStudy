# Git

## 环境配置

**配置用户名和邮箱**

git config --global user.name "zzy"

git config --global user.email 10090xxx95@qq.com

**相关的配置文件**

1. 安装目录\Git\mingw32\etc   安装目录下的gitconfig   --system 系统级
2. C:\User\Administrator\.gitconfig   只适用于当前登录用户的配置   --global 全局

## 基本操作

<img src="E:\frontendStudy\Git\Git.assets\image-20210503190510621.png" alt="image-20210503190510621" style="zoom:80%;" />

- git config --global user.name "Your Name"

- git config --global user.email "email@example.com"

  > 注意`git config`命令的`--global`参数，用了这个参数，表示你这台机器上所有的Git仓库都会使用这个配置，当然也可以对某个仓库指定不同的用户名和Email地址。



### git init

初始化目录，将其变为Git可以管理的仓库

会生成一个.git目录，默认隐藏，用于跟踪管理版本库



### git add

git add <file>

把文件添加到仓库

- 实际上是加到暂存区

- 可以多次add 然后一次commit

$ git add +文件名.文件类型 ，将某个文件加到缓存区
$ git add +文件名.文件类型 ... 文件名.文件类型 ，将n个文件添加到缓存区
$ git add xx文件夹/*.html，将xx文件夹下的所有的html文件添加到缓存区。
$ git add *hhh ，将以hhh结尾的文件的所有修改添加到暂存区
$ git add Hello* ，将所有以Hello开头的文件的修改添加到暂存区
git add -u ，提交被修改(modified)和被删除(deleted)文件，不包括新文件(new)
git add .，提交新文件(new)和被修改(modified)文件，不包括被删除(deleted)文件
…
git add -A，提交所有变化。git add前几条都可以记不住，这个必须记住！！！




### git commit

git commit -m "message"

把文件提交到仓库

- -m “提交说明”

#### commit格式

## Commit message 的格式

每次提交，Commit message 都包括三个部分：header，body 和 footer。



```xml
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

其中，header 是必需的，body 和 footer 可以省略。
 不管是哪一个部分，任何一行都不得超过72个字符（或100个字符）。这是为了避免自动换行影响美观。

### Header

Header部分只有一行，包括三个字段：`type`（必需）、`scope`（可选）和`subject`（必需）。

#### type

用于说明 commit 的类别，只允许使用下面7个标识。

- feat：新功能（feature）
- fix：修补bug
- docs：文档（documentation）
- style： 格式（不影响代码运行的变动）
- refactor：重构（即不是新增功能，也不是修改bug的代码变动）
- test：增加测试
- chore：构建过程或辅助工具的变动

如果type为`feat`和`fix`，则该 commit 将肯定出现在 Change log 之中。其他情况（`docs`、`chore`、`style`、`refactor`、`test`）由你决定，要不要放入 Change log，建议是不要。

#### scope

scope用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

例如在`Angular`，可以是`$location`, `$browser`, `$compile`, `$rootScope`, `ngHref`, `ngClick`, `ngView`等。

如果你的修改影响了不止一个`scope`，你可以使用`*`代替。

#### subject

`subject`是 commit 目的的简短描述，不超过50个字符。

其他注意事项：

- 以动词开头，使用第一人称现在时，比如change，而不是changed或changes
- 第一个字母小写
- 结尾不加句号（.）

### Body

Body 部分是对本次 commit 的详细描述，可以分成多行。下面是一个范例。



```php
More detailed explanatory text, if necessary.  Wrap it to 
about 72 characters or so. 

Further paragraphs come after blank lines.

- Bullet points are okay, too
- Use a hanging indent
```

有两个注意点:

- 使用第一人称现在时，比如使用change而不是changed或changes。
- 永远别忘了第2行是空行
- 应该说明代码变动的动机，以及与以前行为的对比。

### Footer

Footer 部分只用于以下两种情况：

#### 不兼容变动

如果当前代码与上一个版本不兼容，则 Footer 部分以BREAKING CHANGE开头，后面是对变动的描述、以及变动理由和迁移方法。



```go
BREAKING CHANGE: isolate scope bindings definition has changed.

    To migrate the code follow the example below:

    Before:

    scope: {
      myAttr: 'attribute',
    }

    After:

    scope: {
      myAttr: '@',
    }

    The removed `inject` wasn't generaly useful for directives so there should be no code using it.
```

#### 关闭 Issue

如果当前 commit 针对某个issue，那么可以在 Footer 部分关闭这个 issue 。



```bash
Closes #234
```

### Revert

还有一种特殊情况，如果当前 commit 用于撤销以前的 commit，则必须以revert:开头，后面跟着被撤销 Commit 的 Header。



```csharp
revert: feat(pencil): add 'graphiteWidth' option

This reverts commit 667ecc1654a317a13331b17617d973392f415f02.
```

Body部分的格式是固定的，必须写成`This reverts commit <hash>`.，其中的hash是被撤销 commit 的 SHA 标识符。

如果当前 commit 与被撤销的 commit，在同一个发布（release）里面，那么它们都不会出现在 Change log 里面。如果两者在不同的发布，那么当前 commit，会出现在 Change log 的Reverts小标题下面。



### git status

获取仓库当前的状态



### git diff

如果`git status`告诉你有文件被修改过，用`git diff`可以查看修改内容



## 忽略文件

![image-20210503191844609](E:\frontendStudy\Git\Git.assets\image-20210503191844609.png)

## 版本控制

### git log

`git log`命令显示从最近到最远的提交日志



### git reset

在Git中，用`HEAD`表示当前版本，上一个版本就是`HEAD^`，上上一个版本就是`HEAD^^`，往上100个版本可写成`HEAD~100`。或者用版本号前几位

- git reset --hard 版本回退



### git reflog

记录了每次一命令



### git checkout -- \<file>

撤销**工作区**的修改，让这个文件回到最近一次`git commit`或`git add`时的状态。



### git reset HEAD \<file>

撤销**暂存区**的修改，重新放回工作区



### git rm

删除一个文件，将这个修改操作添加到暂存区



## 远程仓库

### 关联远程库

使用命令`git remote add origin git@server-name:path/repo-name.git`

### git push

推送到远程库

- 使用命令`git push -u origin master`第一次推送master分支的所有内容；

- 此后，每次本地提交后，只要有必要，就可以使用命令`git push origin master`推送最新修改；



### git clone

克隆到本地库



## 分支管理

<img src="E:\frontendStudy\Git\Git.assets\image-20210504180203926.png" alt="image-20210504180203926" style="zoom:80%;" />

首先，我们创建`dev`分支，然后切换到`dev`分支：

```
$ git checkout -b dev
Switched to a new branch 'dev'
```

`git checkout`命令加上`-b`参数表示创建并切换，相当于以下两条命令：

```
$ git branch dev
$ git checkout dev
Switched to branch 'dev'
```

### git branch

<img src="E:\frontendStudy\Git\Git.assets\image-20210511105535252.png" alt="image-20210511105535252" style="zoom:80%;" />

`git branch`命令会列出所有分支，当前分支前面会标一个`*`号。



**Git鼓励大量使用分支：**

查看分支：`git branch`

创建分支：`git branch <name>`

切换分支：`git checkout <name>`或者`git switch <name>`

创建+切换分支：`git checkout -b <name>`或者`git switch -c <name>`

合并某分支到当前分支：`git merge <name>`

删除分支：`git branch -d <name>`



`dev`分支是开发分支，团队所有成员都需要在上面工作，所以也需要与远程同步；

```
git push origin dev
```



### 多人协作

多人协作的工作模式通常是这样：

1. 首先，可以试图用`git push origin <branch-name>`推送自己的修改；
2. 如果推送失败，则因为远程分支比你的本地更新，需要先用`git pull`试图合并；
3. 如果合并有冲突，则解决冲突，并在本地提交；
4. 没有冲突或者解决掉冲突后，再用`git push origin <branch-name>`推送就能成功！

如果`git pull`提示`no tracking information`，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream-to <branch-name> origin/<branch-name>`。