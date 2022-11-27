import { useRouter } from 'next/router';
import { Container, Pagination } from 'semantic-ui-react';

const CustomerPagination = ({ totalPages }) => {
    const router = useRouter();
    return (
        <>
            <Container textAlign="center">
                <Pagination
                    defaultActivePage={1}
                    firstItem={null}
                    lastItem={null}
                    totalPages={totalPages}
                    onPageChange={(e, data) => {
                        data.activePage === 1 ? router.push('/admin/customers').then(() => window.scrollTo({
                            top: 0,
                            left: 100,
                            behavior: 'smooth'
                        })) : router.push(`/admin/customers?page=${data.activePage}`).then(() => window.scrollTo({
                            top: 0,
                            left: 100,
                            behavior: 'smooth'
                        }));
                    }}
                />
            </Container>
        </>
    );
}

export default CustomerPagination;
