import PageSection from '../../../components/statics/PageSection';
import headerLogo from '../../../../static/images/content-style-guide/voice-tone-style_image.jpg';
import { PharosHeading, PharosLink } from '@ithaka/pharos/lib/react-components';

<>
  <PageSection title="Voice and tone" isHeader>
    <div
      style={{
        marginBottom: 'var(--pharos-spacing-5-x)',
        fontSize: 'var(--pharos-type-scale-6)',
        lineHeight: '2rem',
      }}
    >
      <p>
        This guide provides a central resource for writing and editing communications using a
        consistent voice and style to support and reinforce the core tenets of our brand.
      </p>
    </div>
    <div style={{ padding: '0 var(--pharos-spacing-5-x)' }}>
      <div>
        <img src={headerLogo} style={{ height: 'auto', maxWidth: '100%' }} />
      </div>
      <div>
        <PharosLink href="https://www.jstor.org/stable/community.14612489" target="_blank">
          Felice Feliciano da Verona, Letters, 15th century, Bodleian Library, University of Oxford
        </PharosLink>
      </div>
    </div>
  </PageSection>

  <PageSection title="Introduction">
    <div style={{ fontSize: 'var(--pharos-type-scale-4)' }}>
      <p>
        JSTOR is a partner to libraries, museums, and publishers. We work hard to reduce costs and
        extend access to underserved populations. The way we communicate with the world is a
        reflection of these efforts.
      </p>
      <p>
        The essence of our mission at JSTOR comes through in all our interactions consistently,
        whether we're emailing librarians about our services, helping a user who lost their
        password, or presenting images in their search results. By being consistent, we provide our
        users with a seamless experience and build their trust.
      </p>
      <p>
        This guide will help you keep a consistent voice and style when writing for JSTOR to
        maintain this trust.
      </p>
    </div>
  </PageSection>

  <PageSection title="Voice">
    <p style={{ fontSize: 'var(--pharos-type-scale-4)' }}>
      The JSTOR voice is clear, trustworthy, and authentic. Copy is conversational, answers users'
      questions, and guides them through tasks. This conversation is the core of UX writing, and it
      runs through the entire user experience.
    </p>
    <div style={{ marginBottom: 'var(--pharos-spacing-3-x)' }}>
      <PharosHeading level={3} preset="4">
        Clear
      </PharosHeading>
      <p>
        People use JSTOR for their research; our efforts to communicate should make this as easy as
        possible, which is why clarity is the most important aspect in our writing.
      </p>
      <p>
        Writing is conversational and at times delightful, but doesn't get in the way of telling the
        user what's going on. There is room for personality in our one-on-one interactions, but
        always keep in mind that our communications need to be understood by users the world over.
      </p>
    </div>
    <div style={{ marginBottom: 'var(--pharos-spacing-3-x)' }}>
      <PharosHeading level={3} preset="4">
        Trustworthy
      </PharosHeading>
      <p>
        We are a resource for research and knowledge. Good writing and proper grammar reinforces our
        users' trust in our reliability. Keeping this trust is also why we never make any claims
        without backing them up.
      </p>
    </div>
    <PharosHeading level={3} preset="4">
      Authentic
    </PharosHeading>
    <p>
      We sound like who we are: real people talking about real things. We write like we speak—no
      salesy language or robotic instructions. As genuine partners of the academic and research
      communities, we write authentically.
    </p>
  </PageSection>

  <PageSection title="Tone">
    <div
      style={{
        marginBottom: 'var(--pharos-spacing-3-x)',
        fontSize: 'var(--pharos-type-scale-4)',
      }}
    >
      <p>
        While we maintain the same voice through all our communications — clear, trustworthy, and
        authentic — different touch points and scenarios along the user's journey call for different
        tones.
      </p>
    </div>
    <div style={{ marginBottom: 'var(--pharos-spacing-2-x)' }}>
      <PharosHeading level={3} preset="4">
        The four dimensions of tone
      </PharosHeading>
      <p>
        As outlined by UX researchers at the Nielsen Norman Group, there are four main dimensions of
        tone: funny/serious, formal/casual, respectful/irreverent, and enthusiastic/matter-of-fact.
        While generally JSTOR will lean towards being serious, casual, respectful, and matter of
        fact, we adjust these dimensions according to the context of our message, both in what we're
        trying to communicate and the channels in which we are communicating.
      </p>
    </div>
    <div style={{ marginBottom: 'var(--pharos-spacing-2-x)' }}>
      <PharosHeading level={'4'} preset={'2'}>
        Serious over funny
      </PharosHeading>
      <p>
        Our users are on JSTOR primarily to do research — they may be writing a paper, studying for
        an exam, or preparing a course, so they want information, not jokes. Occasionally, there may
        be opportunities for humor, but tread with care. Ask yourself: will a stressed-out
        university student having difficulties logging in really find this amusing?
      </p>
    </div>
    <div style={{ marginBottom: 'var(--pharos-spacing-2-x)' }}>
      <PharosHeading level={'4'} preset={'2'}>
        Casual over formal
      </PharosHeading>
      <p>
        While academic content is often formal, we want JSTOR itself to be accessible and personal,
        so we take a casual tone as a reminder that there are real people behind the platform and
        the organization.
      </p>
    </div>
    <div style={{ marginBottom: 'var(--pharos-spacing-2-x)' }}>
      <PharosHeading level={'4'} preset={'2'}>
        Respectful over irreverent
      </PharosHeading>
      <p>Not unlike serious vs. funny, to earn our users' trust, our tone is always respectful.</p>
    </div>
    <div>
      <PharosHeading level={'4'} preset={'2'}>
        Matter-of-fact over enthusiastic
      </PharosHeading>
      <p>
        As part of our authenticity, we use a matter-of-fact tone — no hyperbole, no fuss, no hard
        sell. You could say we keep things cool. These are all subjective qualities, of course. Just
        remember, as we do in personal conversations, we adapt our tone depending on who we're
        communicating with and what we're saying to them. Not sure if you're getting it quite right?
        Try saying it out loud.
      </p>
    </div>
  </PageSection>

  <PharosHeading level={'2'} preset={'6'}>
    Writing Principles
  </PharosHeading>

  <div style={{ marginBottom: 'var(--pharos-spacing-3-x)' }}>
    <PharosHeading level={3} preset="4">
      Useful
    </PharosHeading>
    <p>
      Our job, always, is to help. Keep the user in mind and the particular needs we're addressing
      in each message. Our copy is focused on getting the user to take a specific action; help them
      understand what our product can do for them and how to do it.
    </p>
  </div>
  <div style={{ marginBottom: 'var(--pharos-spacing-3-x)' }}>
    <PharosHeading level={3} preset="4">
      Concise
    </PharosHeading>
    <p>
      We use plain language — it's how people speak, and it's how they search the web. Short, simple
      words are preferable to fancy ones.
    </p>
    <p>
      The way we write is simple and direct, and for all reading levels. It should be understandable
      by anyone regardless of their culture, language, or ability.
    </p>
  </div>
  <div>
    <PharosHeading level={3} preset="4">
      Consistent
    </PharosHeading>
    <p>
      Our voice is consistent across all products and interfaces, as if it were written by the same
      person. Users should experience a seamless transition as they make their way through our
      systems.
    </p>
    <p>We address readers directly. Use the word "you" for them and "we" for our organization. </p>
    <p>
      Use the same wording to refer to the same items and actions; don't talk about the archive in
      one paragraph and switch to database in the next.
    </p>
  </div>
</>;
