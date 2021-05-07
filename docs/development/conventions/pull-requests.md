# Pull requests

<!-- toc -->

- [Title](#title)
- [Description](#description)
- [Labels](#labels)
- [Create a Changeset](#create-a-changeset)
- [Add yourself to the contributor list](#add-yourself-to-the-contributor-list)

<!-- tocstop -->

Follow the guidelines in the sections below to author pull requests that facilitate effective collaboration.

## Title

A good pull request title, like a good commit message title, should start with the type of change made followed by a concise summary of the change.

## Description

The Pharos repository provides a thorough pull request template—please fill it out in full, and provide as much context as you can for the change so all involved can gain shared understanding on the desired outcomes.

The pull request review provides an opportunity to discuss how a component works across browsers, designs, screen sizes, and so on, so collective understanding of the intent helps cover all those bases as effectively as possible.

## Labels

The Pharos repository provides a number of labels to help add quick scannability of pull requests:

- **documentation**: Adds or improves documentation about a component or process
- **infrastructure**: Updates continuous integration, command line tooling, or similar
- **accessibility**: Improves the accessibility of a component
- **storybook**: Upgrades or installs an addon for Storybook
- **status/<status>**: Indicates the current status of the pull request, which might be in review, ready for testing, blocked, and so on
- **note/<note>**: Calls out some aspect of the pull request that's worth noting
- **component/<component>**: Adds or affects the specified component
- **package/<package>**: Affects the specified package

A few other odds and ends exist, so scan through the available labels to see what else might be applicable.

## Create a Changeset

Most changes should be accompanied by an entry added to the package's change log. This file helps maintain a clearer history than the Git log about what changed and, importantly, in which pull request that change arrived.

Use [Changesets](https://github.com/atlassian/changesets) to create a changeset, which will be used to update the change log for any changed packages upon release:

```shell
$ yarn changeset
```

This command will ask you a series of questions:

1. Which packages you want to release.
2. What types of changes were made for each package. Determine the change type using [semantic versioning](https://semver.org/).
3. A summary of the entire changeset. Changeset entries generally mirror the title of the corresponding pull request.

At the final step the tool will show the changeset it will generate, and confirm that you want to add it. Once confirmed, the changeset will be written to a uniquely-named Markdown file in the `.changeset/` directory. Each generated Markdown file will look something like this:

```
---
'@ithaka/pharos-cli': patch
'@ithaka/pharos': patch
'@ithaka/pharos-site': patch
---

Replace Lerna with Yarn and Changesets
```

When trying to understand where a bug might've been introduced, or the last time an area of the code changed, the change log can help track things down more quickly.

## Add yourself to the contributor list

We want to make sure everyone is recognized for their contributions to Pharos! To add yourself to the all-contributors table in the README, run the following command from the root of the repository:

```shell
$ yarn all-contributors add <username> <contribution>
```

This will automatically add you to the table and commit the changes. For more information, see the all-contributors cli [usage documentation](https://allcontributors.org/docs/en/cli/usage).
