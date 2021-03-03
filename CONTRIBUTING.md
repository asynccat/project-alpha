# Contributing to Backoffice

This is a study project, so contributing code is available for team-members only.

If you want to ask team members, or have a problem or question about codebase or application itself:
Please create an issue [here](https://github.com/ivan-gerasin/project-alpha/issues)

 - [Submission guidelines](#submit)
 - [Coding rules](#rules)

## <a name="submit"></a> Submitting a Pull Request (PR)

Before you submit your PR, consider the following guidelines:
1. Make you changes in a new git branch using [branch format](#branch-format).
2. Create your patch, **including appropriate test cases**.
3. Follow our [coding rules](#rules).
4. Run the fill test suite with **TO BE DEFINED**, and ensure that all tests pass.
5. Commit your changes using a [descriptive commit message](#commit-format).
6. Push your branch to github.
7. In Github, send pull request to `develop` branch.
8. Code owners will be added by default to review
9. If any changes was suggested:
   - make the required updates
   - rerun test suites
10. Wait for code owners approvals
11. That's it!

##### After merge
After you PR is merged, please make sure you deleted your branch from remote repository.
You can use GitHub UI, or do it via local shell:
 - `git push  origin --delete <branch-name>`
 - `git branch -D <branch-name>` to remove local branch (if you want)


### <a name="branch-format"></a> Branch format

```
git checkout -b <branch-type>/<ticket>-<description>
```
##### Branch type
`branch-type` can be:
 - `bugfix` for bug fixes
 - `feature` for new features
 - `conf` for changing any configuration, settings, ci and so on
 - `other` default for cases when it does not fit types above
##### Ticket
`ticket` is stands for ticket number in jira, for example - `PA-123`

##### Description
And finally, `description` - is optional and brief description of the branch.
You can omit it, if you want. You can use it, for instance,
to split development of a single feature into several parts like
```
feature/PA-123-front-end
feature/PA-123-back-end
feature/PA-123-test-build
```

### Commit format
```
git commit -m '<type>(<ticket>): <summary>'
```
##### Type
 - `build` - Changes that affect the build system or external dependencies (example: npm, webpack)
 - `feat` - A new feature or it's part
 - `fix` - A bug fix
 - `test` - Adding missing test or correcting existing test. Test for new feature should be with `feat`
 - `refactor` -  A code change that neither fixes a bug nor adds a feature
 - `docs` - Changes in documentation
 - `other` - Any changes that does not fit previous types

##### Ticket
`ticket` is stands for ticket number in jira, for example - `PA-123`

##### Summary
Use the summary field to provide a succinct description of the change:
- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end


## <a name="rules"></a> Coding rules

We are using linter for typescript and python. They are integrated into CI
so you have to follow rules that provided by this linters.
 - TypeScript linter runs automatically on build
 - Python linter you must run manually 
