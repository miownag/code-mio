interface MomentBase {
  id: string;
  date: string;
  pinned?: boolean;
}

interface TextMoment extends MomentBase {
  type: "text";
  content: string;
  contentFile?: string;
}

interface PostMoment extends MomentBase {
  type: "post";
  postId: string;
  comment?: string;
}

interface PhotoMoment extends MomentBase {
  type: "photo";
  photoIds: number[];
  caption?: string;
}

type Moment = TextMoment | PostMoment | PhotoMoment;

export type { Moment, TextMoment, PostMoment, PhotoMoment, MomentBase };
