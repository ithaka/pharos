<h1 align="center">
  Publishing documentation
</h1>

## Pharos components

Components used in the documentation can be found in `/src/components`. Examples of them being used and imported can be seen in other existing files found in `pharos-site/src/static`. Please use the `<PageSection>` component for each documentation category and use its `subSectionLevel` property for subsections under the category. For best practices, also use the `<BestPractices>` component

## Adding page to side-navigation bar

When creating a new section or page of documentation, it is important to add a link to the page in the sidenav so that users can readily navigate to the page. This involves accessing the sidenav component in `pharos-site/src/components/Sidenav.tsx` and adding the newly made page to the appropriate array, which will generate a link in the sidenav automatically. Consequently, it is important to follow the naming conventions mentioned in the MDX section.

## Making a pull request

Once a page has been created or documentation has been modified, you can then generate a [pull request](https://github.com/ithaka/pharos/pulls) indicating the changes made.
