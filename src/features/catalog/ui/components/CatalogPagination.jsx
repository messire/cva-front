import {Button, HStack, Text} from "@chakra-ui/react";

export function CatalogPagination({page, totalPages, isLoading, onPrev, onNext,}) {
    const canPrev = page > 1;
    const canNext = page < totalPages;

    return (
        <HStack justify="center" align="center" pt={2}>
            <Button
                variant="plain"
                onClick={onPrev}
                colorPalette="brand"
                disabled={!canPrev || isLoading}
            >
                Prev
            </Button>

            <Text color="text.brand">
                Page <b>{page}</b> of <b>{totalPages}</b>
            </Text>

            <Button
                variant="plain"
                onClick={onNext}
                colorPalette="brand"
                disabled={!canNext || isLoading}
            >
                Next
            </Button>
        </HStack>
    );
}