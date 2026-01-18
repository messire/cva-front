import {Button, HStack, Text} from "@chakra-ui/react";

export function CatalogPagination({page, totalPages, isLoading, onPrev, onNext,}) {
    const canPrev = page > 1;
    const canNext = page < totalPages;

    return (
        <HStack justify="space-between" align="center" pt={2}>
            <Button
                variant="outline"
                onClick={onPrev}
                disabled={!canPrev || isLoading}
            >
                Prev
            </Button>

            <Text color="text.secondary">
                Page <b>{page}</b> of <b>{totalPages}</b>
            </Text>

            <Button
                variant="outline"
                onClick={onNext}
                disabled={!canNext || isLoading}
            >
                Next
            </Button>
        </HStack>
    );
}