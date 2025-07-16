"use client";
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Typography, Divider, List, Row, Col, Grid, Menu, Layout, Button } from 'antd';
import { DownOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';
import { GetCategoriesPolicy } from '@/lib/directus/policy/categoriesPolicy';
import { CategoriesPolicyTranslation } from '@/types/directus/policy/categoriesPolicy';
import { PrivacyPolicyTranslation as BasePrivacyPolicyTranslation } from '@/types/directus/policy/privacyPolicy';

interface PrivacyPolicyTranslation extends BasePrivacyPolicyTranslation {
    categories: {
        categories_policy_id: number;
        name: string;
        [key: string]: any;
    }[];
}
import { useLocale } from 'next-intl';
import PrivacyPolicySkeleton from '@/skeleton/policy/privacyPolicy';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

const { Text } = Typography;
const { useBreakpoint } = Grid;

const Breadcrumb: React.FC<{ path: string }> = ({ path }) => (
    <div style={{
        marginBottom: '24px',
        fontSize: '14px',
        color: '#6b7280'
    }}>
        {path}
    </div>
);

export default function PolicyPage() {
    const locale = useLocale();
    const screens = useBreakpoint();
    const [collapsed, setCollapsed] = useState(false);
    const [selectedMenuKey, setSelectedMenuKey] = useState('policy-1');

    const [categories, setCategories] = useState<CategoriesPolicyTranslation[]>([]);
    const [privacyPolicies, setPrivacyPolicies] = useState<PrivacyPolicyTranslation[]>([]);
    const [loading, setLoading] = useState(true); // Reintroduce loading state
    const [error, setError] = useState<string | null>(null);
    const [menuItems, setMenuItems] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const categoriesData = await GetCategoriesPolicy(locale);

                const privacyDataResponse = await fetch(
                    `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/privacy_policy?lang=${locale === "vi" ? "vi-VN" : locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-US"}&fields=*,categories.*,translations.*`,
                    {
                        headers: {
                            Accept: "application/json",
                        },
                    }
                );

                if (!privacyDataResponse.ok) {
                    throw new Error(`HTTP error! status: ${privacyDataResponse.status}`);
                }

                const { data: privacyData } = await privacyDataResponse.json();

                if (categoriesData) {
                    setCategories(categoriesData);

                    const buildMenuItems = (categories: CategoriesPolicyTranslation[]) => {
                        const parentCategory = categories.find(cat => cat.categories_policy_id === 1);
                        const childCategories = categories.filter(cat => cat.categories_policy_id !== 1);

                        if (!parentCategory) return [];

                        const menuItem = {
                            key: `policy-${parentCategory.categories_policy_id}`,
                            label: parentCategory.name,
                            children: childCategories.map(child => ({
                                key: `policy-${child.categories_policy_id}`,
                                label: child.name,
                                categoryId: child.categories_policy_id
                            }))
                        };

                        return [menuItem];
                    };

                    const items = buildMenuItems(categoriesData);
                    setMenuItems(items);

                    if (items.length > 0 && items[0].children && items[0].children.length > 0) {
                        setSelectedMenuKey(items[0].children[0].key);
                    } else if (items.length > 0) {
                        setSelectedMenuKey(items[0].key);
                    }
                }

                if (privacyData && privacyData.length > 0) {
                    interface PolicyTranslation {
                        id: number;
                        languages_code: string;
                        content: string;
                        breadcrumb?: string;
                        [key: string]: any;
                    }

                    interface PolicyCategory {
                        categories_policy_id: number;
                        name: string;
                        [key: string]: any;
                    }

                    interface PolicyData {
                        translations: PolicyTranslation[];
                        categories: PolicyCategory[];
                        [key: string]: any;
                    }

                    const translations: (PolicyTranslation & { categories: PolicyCategory[] })[] = (privacyData as PolicyData[]).flatMap((policy: PolicyData) =>
                        policy.translations
                            .filter((t: PolicyTranslation) =>
                                t.languages_code === (locale === "vi" ? "vi-VN" : locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-US")
                            )
                            .map((t: PolicyTranslation) => ({
                                ...t,
                                categories: policy.categories
                            }))
                    );
                    setPrivacyPolicies(translations);
                }
            } catch (err) {
                console.error('Error fetching policy data:', err);
                setError('Không thể tải dữ liệu chính sách. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [locale]);

    const styles = useMemo(() => ({
        container: {
            maxWidth: 1280,
            margin: '0 auto',
            padding: screens.xs ? '24px 16px' : '40px 24px',
            minHeight: '100vh'
        },
        title: {
            fontSize: screens.xs ? 18 : screens.sm ? 20 : 24,
            marginBottom: screens.xs ? 16 : 24,
            color: '#1f2937'
        },
        paragraph: {
            fontSize: screens.xs ? 14 : 16,
            color: '#4B5563',
            marginBottom: screens.xs ? 16 : 24,
            lineHeight: 1.6,
        },
        highlightBox: {
            backgroundColor: '#f3f4f6',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '32px'
        }
    }), [screens]);

    const listFontSize = useMemo(() => screens.xs ? 14 : 16, [screens.xs]);

    const handleMenuSelect = useCallback(({ key }: { key: string }) => {
        setSelectedMenuKey(key);
    }, []);

    const toggleCollapse = useCallback(() => {
        setCollapsed(prev => !prev);
    }, []);

    const getCurrentCategoryName = useCallback(() => {
        const categoryId = parseInt(selectedMenuKey.replace('policy-', ''));
        const category = categories.find(cat => cat.categories_policy_id === categoryId);
        return category ? category.name : 'Chính sách bảo vệ dữ liệu';
    }, [selectedMenuKey, categories]);

    const getBreadcrumbPath = useCallback(() => {
        const currentCategory = getCurrentCategoryName();
        const categoryId = parseInt(selectedMenuKey.replace('policy-', ''));

        if (categoryId === 1) {
            return "Trang chủ > Chính sách bảo vệ dữ liệu";
        } else {
            return `Trang chủ > Chính sách bảo vệ dữ liệu > ${currentCategory}`;
        }
    }, [selectedMenuKey, getCurrentCategoryName]);

    const parseHtmlContent = useCallback((htmlContent: string) => {
        if (!htmlContent) return null;
        const sanitizedContent = DOMPurify.sanitize(htmlContent);
        return parse(sanitizedContent);
    }, []);

    const PolicyContentFromAPI = () => {
        const categoryId = parseInt(selectedMenuKey.replace('policy-', ''));

        const matchingPolicy = privacyPolicies.find(policy =>
            policy.categories.some(cat => cat.categories_policy_id === categoryId)
        );

        if (matchingPolicy) {
            return (
                <>
                    <Breadcrumb path={matchingPolicy.breadcrumb || getBreadcrumbPath()} />
                    <div style={{ ...styles.paragraph }}>
                        {parseHtmlContent(matchingPolicy.content)}
                    </div>
                </>
            );
        }
        return null;
    };

    const contentMap = useMemo(() => {
        const map: { [key: string]: React.ReactElement } = {};
        categories.forEach(category => {
            map[`policy-${category.categories_policy_id}`] = <PolicyContentFromAPI />;
        });
        return map;
    }, [styles, listFontSize, getBreadcrumbPath, getCurrentCategoryName, categories, privacyPolicies]);

    const renderContent = useCallback(() => {
        if (loading) {
            return <PrivacyPolicySkeleton />;
        }

        if (error) {
            return (
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <Text type="danger">{error}</Text>
                </div>
            );
        }

        return contentMap[selectedMenuKey] || <PolicyContentFromAPI />;
    }, [selectedMenuKey, loading, error, contentMap]);

    return (
        <div style={styles.container}>
            <Row
                gutter={[16, 16]}
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    minHeight: '100%',
                    alignItems: 'stretch'
                }}
            >
                <Col xs={24} md={6} style={{ position: 'relative', minWidth: '40px' }} className='md:border-none border-b md:pb-0 pb-5 border-gray-200'>
                    <div
                        className={collapsed ? '' : 'md:border-r md:border-r-gray-300'}
                        style={{ height: '100%' }}
                    >
                        <span className='md:block hidden'>
                            <Button
                                icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
                                onClick={toggleCollapse}
                                style={{
                                    position: 'absolute',
                                    right: collapsed ? '295px' : '-7px',
                                    top: '40px',
                                    zIndex: 10,
                                }}
                            />
                        </span>
                        {!collapsed && (
                            <div className='-ml-6 mr-10'>
                                {loading ? (
                                    <PrivacyPolicySkeleton />
                                ) : menuItems.length > 0 ? (
                                    <Menu
                                        mode="inline"
                                        defaultOpenKeys={[menuItems[0]?.key]}
                                        selectedKeys={[selectedMenuKey]}
                                        onSelect={handleMenuSelect}
                                        style={{ border: 'none', boxShadow: 'none', height: '100%' }}
                                        items={menuItems}
                                    />
                                ) : (
                                    <div style={{ padding: '20px', textAlign: 'center' }}>
                                        <Text type="secondary">Không có dữ liệu menu</Text>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </Col>
                <Col xs={24} md={collapsed ? 24 : 18}>
                    <div className='mt-5 md:border-none border-gray-200 md:p-0 p-3 rounded-xl md:ml-10'>
                        {renderContent()}
                    </div>
                </Col>
            </Row>
        </div>
    );
}