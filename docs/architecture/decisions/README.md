# Pharos architecture decision records

These are high-level structural and process decisions that guide the evolution of this project over long timeframes.
You can see the table of contents in [the index](./index.md).

## Managing records

These records are managed using the [adr-tools](https://github.com/npryce/adr-tools) project.

### Creating a new record

You can create a new record with the `new` subcommand along with a useful title:

```shell
$ adr new An important decision
```

### Generating the table of contents

When adding new records, ensure the table of contents is also up to date using the `generate` subcommand:

```shell
$ adr generate toc > docs/architecture/decisions/index.md
```

If you'd like to see the records in visual form,
you can use the `generate` subcommand
along with [dot](https://graphviz.org/docs/layouts/dot/) and [imgcat](https://github.com/trashhalo/imgcat)
to generate a graph of records and their relationships:

```shell
$ adr generate graph | dot -Tpng | imgcat
```

### Linking records

The relationship of new decisions to old is important.
You can link two records and the nature of their relationship using the `link` subcommand:

```shell
$ adr link <ADR A> Amends <ADR B> "Amended by"
```
