import PageSection from '../../../components/statics/PageSection.tsx';

<>
  <PageSection title="Contributing development" isHeader></PageSection>

  <PageSection title="">
    <p>
      Pharos is a living design system that continues to expand with help from the community. We're
      excited to work with contributors like you to further enrich the system. Discussions about
      issues, bugs, and features for Pharos take place on GitHub. If you don't have a GitHub
      account, {/* <!--- pretiier-ignore-start --> */}
      <PharosLink href="https://github.com/signup?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2F&source=header-home">
        create one
      </PharosLink>{' '}
      {/* <!--- pretiier-ignore-stop --> */}
      to join the community.
    </p>
    <p>You can contribute to Pharos in three ways:</p>
    <ol>
      <li>
        <strong>Open an issue or feature request:</strong> The maintainers will review the issue or
        request and respond with appropriate next steps. If accepted, it will be added to an
        upcoming milestone. When possible, a tentative timeline will be shared to give members an
        estimate of when to expect the next release.
      </li>
      <li>
        <strong>Make the change in Pharos:</strong> To make the contribution yourself please follow
        the process outlined below. The maintainers are more than happy to assist and support you
        through the contribution.
      </li>
      <li>
        <strong>Join a discussion:</strong> Community members can get involved with asking or
        helping answer questions, sharing updates, and following along with potential decisions in
        the project's {/* <!--- pretiier-ignore-start --> */}
        <PharosLink href="https://github.com/ithaka/pharos/discussions">
          open communication forum
        </PharosLink>{' '}
        {/* <!--- pretiier-ignore-stop --> */}
        on GitHub.
      </li>
    </ol>
  </PageSection>

  <PageSection title="The Pharos community">
    <PageSection title="Users" subSectionLevel={1}>
      <p>
        Pharos users follow the{' '}
        <PharosLink href="/brand-expressions/logos">system's guidelines</PharosLink> to implement
        Pharos into their product or marketing needs.
      </p>
    </PageSection>
    <PageSection title="Contributors" subSectionLevel={1}>
      <p>
        Contributors are community members who report bugs, request new features, or make changes to
        the system. Changes can include adding a new feature, fixing a bug, or updating
        documentation.
      </p>
    </PageSection>
    <PageSection title="Maintainers" subSectionLevel={1}>
      <p>
        Maintainers are community members who are involved with helping maintain the repository,
        participating in planning future needs and milestones, triaging issues. This involves
        labeling, closing, and merging pull requests.
      </p>
    </PageSection>
  </PageSection>

  <PageSection title="The process">
    <ol>
      <li>
        <strong>Open a GitHub issue:</strong>
        <ol>
          <li>
            If so, please comment on the issue that you'd like to address it so that the maintainers
            are aware of your intent and can assign you.
          </li>
          <li>
            If not, create one using either the {/* <!--- pretiier-ignore-start --> */}
            <PharosLink href="https://github.com/ithaka/pharos/issues/new?assignees=&labels=feature+request&template=feature_request.md">
              feature request
            </PharosLink>{' '}
            {/* <!--- pretiier-ignore-stop --> */}
            or {/* <!--- pretiier-ignore-start --> */}
            <PharosLink href="https://github.com/ithaka/pharos/issues/new?assignees=&labels=bug&template=bug_report.md">
              bug report
            </PharosLink>{' '}
            {/* <!--- pretiier-ignore-stop --> */}
            template, depending on the type of contribution. Then assign yourself to it for
            visibility.
          </li>
        </ol>
      </li>
      <li>
        <strong>Make the change:</strong>
        If you haven't already done so, clone the{' '}
        <PharosLink href="https://github.com/ithaka/pharos">repo</PharosLink> and create a new
        branch for your contribution. Review the
        {/* <!--- pretiier-ignore-start --> */}
        <PharosLink href="https://github.com/ithaka/pharos/blob/develop/docs/README.md">
          development guidelines
        </PharosLink>{' '}
        {/* <!--- pretiier-ignore-stop --> */}
        to learn about contributing code to Pharos.
      </li>
      <li>
        <strong>Open a pull request:</strong>
        Follow the {/* <!--- pretiier-ignore-start --> */}
        <PharosLink href="https://github.com/ithaka/pharos/blob/develop/docs/development/conventions/pull-requests.md">
          guidelines
        </PharosLink>
        {/* <!--- pretiier-ignore-stop --> */}, fill out the pull request template as best you can,
        and request a review from the <i>Pharos maintainers</i> team.
      </li>
      <li>
        <strong>Pass checks:</strong>
        <ol>
          <li>Lint - Analyzes your code for problematic patterns</li>
          <li>Test - Runs browser tests and validates code coverage thresholds are met</li>
          <li>
            Chromatic (for Storybook and component related changes) - Takes snapshots of all stories
            in Storybook and compares them against the baseline
          </li>
          <li>
            Netlify preview (for site related changes) - Generates a preview build of the site for
            the maintainers to review and provide feedback
          </li>
        </ol>
      </li>
      <li>
        <strong>Await approval:</strong> Address feedback and get approval from development and
        design. From here the maintainers will merge your changes and include it in the next
        release.
      </li>
    </ol>
  </PageSection>
</>;
