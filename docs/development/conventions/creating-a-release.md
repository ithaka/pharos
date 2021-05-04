# Creating a Pharos release

<!-- toc -->

- [Preparing for a release](#preparing-for-a-release)
- [Publishing a release](#publishing-a-release)

<!-- tocstop -->

When the set of unreleased changes feels like a shippable set of value, the maintainers will typically plan, make, and announce a new release.

## Preparing for a release

The `develop` branch's latest changes must be merged into the `main` branch. It's important to do a fast-forward merge to avoid additional merge commits:

```shell
$ git checkout develop
$ git pull origin develop
$ git checkout main
$ git merge develop --ff
```

This brings the set of changes onto the `main` branch for a stable release. If that's successful, you'll be ready to publish the release.

## Publishing a release

You'll use [Changesets](https://github.com/atlassian/changesets/tree/main/packages/cli) to version and publish the package. First you'll need to update the versions for all packages described in the changesets since last release:

```shell
$ yarn changeset version
```

This command reads, then deletes, the changesets for the release.

Changesets requires access to GitHub to properly link to commits, pull requests, and authors. If you see the following error, you'll first need to create a personal access token on GitHub. **Be sure to save this token value somewhere safe before leaving the screen** or you'll have to generate another one.

```
🦋  error Error: Please create a GitHub personal access token at https://github.com/settings/tokens/new and add it as the GITHUB_TOKEN environment variable
```

**Be sure you commit the changes resulting from the versioning command to the `main` branch before you continue.**

Once you've merged the versioning changes, it's time to publish the new versions:

```shell
$ yarn changeset publish
```

This publishes the newly-versioned packages to [npm](https://www.npmjs.com/) and creates Git tags which you need to push to GitHub:

```shell
$ git push --follow-tags
```

The last step is to open a pull request from `main` to `develop` to pull in the updated version strings.
