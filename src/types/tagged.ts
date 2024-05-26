declare const tag: unique symbol;

export type TagContainer<Token> = {
  readonly [tag]: Token;
};

type Tag<Token extends PropertyKey, TagMetadata> = TagContainer<{
  [K in Token]: TagMetadata;
}>;

export type Tagged<
  Type,
  TagName extends PropertyKey,
  TagMetadata = never,
> = Type & Tag<TagName, TagMetadata>;
