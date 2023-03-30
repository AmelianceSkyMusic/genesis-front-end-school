interface CourseVideoPreview {
	link: string;
	duration: number;
	previewImageLink: string;
}

interface Meta {
	slug: string;
	skills: string[];
	courseVideoPreview: CourseVideoPreview;
}

export interface LessonResponse {
	id: string;
	title: string;
	duration: number;
	order: number;
	type: string;
	status: string;
	link: string;
	previewImageLink: string;
	meta?: unknown;
}

export interface CourseResponse {
	id: string;
	title: string;
	tags: string[];
	launchDate: Date;
	status: string;
	description: string;
	duration: number;
	previewImageLink: string;
	rating: number;
	meta: Meta;
	lessons: LessonResponse[];
	containsLockedLessons: boolean;
}
