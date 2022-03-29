const baseLabels = {
	totalDocs: 'count',
	limit: 'perPage',
	page: 'currentPage',
	nextPage: 'next',
	prevPage: 'prev',
	totalPages: 'pageCount',
	pagingCounter: 'slNo',
	meta: 'paginator'
}

export const userPaginatorLabels = { ...baseLabels, docs: 'users' }
export const coachPaginatorLabels = { ...baseLabels, docs: 'coach' }