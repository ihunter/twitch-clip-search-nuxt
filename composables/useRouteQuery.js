export function useRouteQuery() {
    const route = useRoute();
    const router = useRouter();

    function updateQuery(queryParams) {
        router.replace({
            query: {
                ...route.query,
                ...queryParams,
            },
        });
    }

    return { updateQuery }
}
